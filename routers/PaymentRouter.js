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

        const { amount } = req.body
        const intAmount = parseInt(amount)

        const com = true
        console.log("com test", com)
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
            console.log("LETS SEE", orderUpdate)

            const updatedUser = await User.findByPk(userIdNeeded,{
                include: [Order],
            })

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

        const { amount, currency } = req.body

        const amountInt = parseInt(amount)

        try{
            const intent = await stripe.paymentIntents.create({
                amount: amountInt,
                currency,
                metadata: {integration_check: 'accept_a_payment'},
            })
            console.log("what happened here", intent)

            const newOrder = await Order.create({
                total: 0,
                userId: userIdNeeded,
                productAmount: 0,
                expressShipping: false,
                shippingAddress: "User Address",
                completed: false,
            })
            console.log("LETS NEW", newOrder)

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