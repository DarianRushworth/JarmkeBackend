const { Router } = require("express")
const stripe = require("stripe")("sk_test_51HGVaXE1l9Lb6wo5H7uIVCZzU63MKDYH9MAyPYyO5jwDgNm97bOicV4vOAcsOsuaW5vZPTnl6x4K6dDHILcqZySP00s7vIArU4")

const authMiddleWare = require("../auth/middleware")

const router = new Router()

router.post(
    "/payment",
    authMiddleWare,
    async(req, res) => {
        const { amount, currency } = req.body

        const amountInt = parseInt(amount)
        try{
            const intent = await stripe.paymentIntents.create({
                amount: amountInt,
                currency,
            })
            console.log("what happened here", intent)

            res.status(202).send({
                client_secret: intent.client_secret
            })

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router