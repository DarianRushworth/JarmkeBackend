const { Router } = require("express")

const authMiddleware = require("../auth/middleware")
const OrderProducts = require("../models").orderProduct
const Order = require("../models").order

const router = new Router()

router.post(
    "/products/:id/shoppingCart",
    authMiddleware,
    async(req, res) => {
        const userIdNeeded = req.user.id
        // console.log("(Cart)user id:", userIdNeeded)
        
        const productIdNeeded = parseInt(req.params.id)
        console.log("(Cart)product id:", productIdNeeded)
        
        const ExpressShipping = req.body.expressShipping
        const shipping = () => {
            if(ExpressShipping === "true"){
            return true
        } else {
            return false
        }
        }
        console.log("expressShipping test", shipping())
        
        const Total = parseInt(req.body.total)
        console.log("total test:", Total)

        try{
            const orderMade = await Order.create({
                total: Total,
                userId: userIdNeeded,
                expressShipping: shipping(),
                completed: false,
            })
            // console.log("response test", orderMade)
            res.status(202).send(orderMade)
            console.log("orderId test", orderMade.id)
            
            const orderDocumented = await OrderProducts.create({
                orderId: orderMade.id,
                productId: productIdNeeded,
            })
            res.status(202).send(orderDocumented)

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router