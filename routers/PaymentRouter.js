const { Router } = require("express")
const stripe = require("stripe")("sk_test_51HGVaXE1l9Lb6wo5H7uIVCZzU63MKDYH9MAyPYyO5jwDgNm97bOicV4vOAcsOsuaW5vZPTnl6x4K6dDHILcqZySP00s7vIArU4")

const Order = require("../models").order
const User = require("../models").user
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

            const updatedUser = await User.findByPk(userIdNeeded,{
                include: [Order],
            })
            if(!updatedUser){
                res.status(404).send("User couldn't be found, please refresh, login and retry.")
            }

            res.status(202).send(updatedUser)

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
                metadata: {integration_check: 'accept_a_payment'},
            })
            // console.log("what happened here", intent)
            if(!intent){
                res.status(400).send("Payment rejected, amount/currency wasn't converted correctly/ stripe payments is down.")
            }

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

            res.status(202).send({
                order: newOrder,
                client_secret: intent.client_secret
            })

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router