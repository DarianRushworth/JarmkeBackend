const { Router } = require("express")
const stripe = require("stripe")("sk_test_51HGVaXE1l9Lb6wo5H7uIVCZzU63MKDYH9MAyPYyO5jwDgNm97bOicV4vOAcsOsuaW5vZPTnl6x4K6dDHILcqZySP00s7vIArU4")
const nodemailer = require("nodemailer")
const niceInvoice = require("nice-invoice")

const Order = require("../models").order
const User = require("../models").user
const OrderProducts = require("../models").orderProduct
const Product = require("../models").product
const authMiddleWare = require("../auth/middleware")

const router = new Router()

router.patch(
    "/payment",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = req.user.id
        if(!userIdNeeded){
            res.status(401).send("Sorry you are not authorized, Login/Sign-up to authorize yourself.")
        }

        const { amount } = req.body
        const intAmount = parseInt(amount)
        if(!amount){
            res.status(400).send("The total amount wasn't calculated correctly please refresh and try again.")
        }

        const com = true
        // console.log("com test", com)

        try{
            const orderUpdate = await Order.update({
                completed: com,
            },{
                where: {
                    total: intAmount,
                    userId: userIdNeeded,
                    completed: false,
                }
            })
            // console.log("LETS SEE", orderUpdate)
            if(!orderUpdate){
                res.status(400).send("Your Order couldn't be completed, please check your account and retry.")
            }

            const orderNeeded = await Order.findOne({
                where: {
                    total: intAmount,
                    userId: userIdNeeded,
                    completed: com,
                }
            })

            if(!orderNeeded){
                res.status(400).send("Your Order couldn't be completed, please check your account and retry.")
            }

            const orderedProducts = await OrderProducts.findAll({
                where: {
                    orderId: orderNeeded.id
                }
            })

            if(!orderedProducts){
                res.status(400).send("Your Order couldn't be completed, please check your account and retry.")
            }

            const productArray = []

            async function productAdapter(id){
                try {
                    const productsFound = await Product.findByPk(id)
                    
                    return productArray.push({
                        item: productsFound.id,
                        description: productsFound.title,
                        price: productsFound.price,
                        quantity: 1,
                        tax: "10%",
                    })
                } catch (error){
                    console.log(error.message)
                }
            }

            orderedProducts.map(product => {
                productAdapter(product.productId)
            })

            const newOrder = await Order.create({
                total: 0,
                userId: userIdNeeded,
                productAmount: 0,
                expressShipping: false,
                shippingAddress: "User Address",
                completed: false,
            })
            // console.log("LETS NEW", newOrder)
            if(!newOrder){
                res.status(400).send("A new order couldn't be made, please add a product to your cart to add new order.")
            }

            const updatedUser = await User.findByPk(userIdNeeded,{
                include: [Order],
            })

            if(!updatedUser){
                res.status(404).send("User couldn't be found, please refresh, login and retry.")
            }

            if(productArray.length > 0){
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const today  = new Date();

                const splitAddress = updatedUser.address.split(",")

                const invoiceData = {
                    shipping: {
                    name: `${updatedUser.firstName} ${updatedUser.lastName}`,
                    address: splitAddress[0],
                    city: splitAddress[2],
                    state: splitAddress[3],
                    country: splitAddress[4],
                    postal_code: splitAddress[1],
                    },
                    items: productArray,
                    subtotal: parseInt(orderNeeded.total),
                    total: (parseInt(orderNeeded.total)) + (parseInt(orderNeeded.total) * 0.10),
                    order_number: orderNeeded.id,
                    header: {
                        company_name: "Jarmke Jewellery",
                        company_logo: "LogoEdit.JPG",
                        company_address: "oud-Loosdrechtsedijk 148, 1231NE, Loosdrecht, Netherlands"
                    },
                    footer: {
                        text: "See you soon.",
                    },
                    currency_symbol:"€",
                    date: {
                        billing_date: today.toLocaleDateString("en-US", options),
                        due_date: today.toLocaleDateString("en-US", options),
                    }
                }
            
                niceInvoice(invoiceData, `${updatedUser.lastName}.pdf`)

                const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 465,
                    secure: true,
                    auth: {
                        user: process.env.OWNER_EMAIL,
                        pass: process.env.OWNER_PASS
                    },
                })

                if(!transporter){
                    res.status(400).send("Mailer transporter isn't firing correctly.")
                }

                const info = await transporter.sendMail({
                    from: "K.Jarmke@gmail.com",
                    to: updatedUser.email,
                    subject: "Order Confirmation",
                    text: "Hey There! Thank you for ordering with Jarmke Jewellery. Please find confirmation below.",
                    html: "<b>Hey There!</b><br> Thank you for ordering with Jarmke Jewellery. Please find confirmation below.</br>",
                    attachments: [
                        {
                            filename: `${updatedUser.lastName}.pdf`,
                            path: `/home/darian4real/Code/Codaisseur Practise/jarmke-backend/${updatedUser.lastName}.pdf`
                        }
                    ]
                })

                if(!info){
                    res.status(400).send("Email couldn't be sent.")
                }

                res.status(202).send(updatedUser)
            }

        } catch(error){
            console.log(error.message)
        }
    }
)

router.post(
    "/payment",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = req.user.id
        if(!userIdNeeded){
            res.status(401).send("Sorry you are not authorized, Login/Sign-up to authorize youself.")
        }

        const { amount, currency } = req.body
        if(!amount || !currency){
            res.status(400).send("Amount or currency wasn't specified, refresh and try again.")
        }

        const amountInt = parseInt(amount)

        try{
            const intent = await stripe.paymentIntents.create({
                amount: amountInt,
                currency,
                metadata: {integration_check: "accept_a_payment"},
                payment_method_types: ["card", "ideal"],
            })
            // console.log("what happened here", intent)
            if(!intent){
                res.status(400).send("Payment rejected, amount/currency wasn't converted correctly/ stripe payments is down.")
            }

            res.status(202).send({
                client_secret: intent.client_secret
            })

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router