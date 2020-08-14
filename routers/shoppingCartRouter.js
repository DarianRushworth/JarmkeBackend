const { Router } = require("express")

const authMiddleware = require("../auth/middleware")
const OrderProducts = require("../models").orderProduct
const Order = require("../models").order
const Products = require("../models").product

const router = new Router()

router.get(
    "/checkout/:id",
    authMiddleware,
    async(req, res) => {
        const orderIdNeeded = parseInt(req.params.id)
        console.log("order id Needed", orderIdNeeded)

        try{
            const orderedProducts = await Order.findOne({
                include: [Products],
                where:{
                    id: orderIdNeeded
                }
            })
            console.log("response test", orderedProducts)
            res.status(202).send(orderedProducts)

        } catch(error){
            console.log(error)
        }
    }
)

router.delete(
    "/checkout/:id/product/:pId",
    authMiddleware,
    async(req, res) => {
        const orderIdNeeded = parseInt(req.params.id)
        console.log("order id test:", orderIdNeeded)

        const productIdNeeded = parseInt(req.params.pId)
        console.log("product id test:", productIdNeeded)

        const userIdNeeded = req.user.id

        try{
            const orderProductRemoved = await OrderProducts.findOne({
                where: {
                    orderId: orderIdNeeded,
                    productId: productIdNeeded,
                }
            })
            console.log("orderProducts test", orderProductRemoved)

            if(!orderProductRemoved){
                res.status(404).send("Oops, something went wrong, refresh and try again.")
            }

            orderProductRemoved.destroy()
            // res.status(202).send("Deletion Successful")

            const product = await Products.findByPk(productIdNeeded)
            console.log("found product price test", product.price)

            const orderSpecifc = await Order.findOne({
                where: {
                    userId: userIdNeeded
                }
            })

            const orderRevised = await orderSpecifc.decrement("total", { by: product.price})
            res.status(202).send(orderRevised)

        } catch(error){
            console.log(error.message)
        }
    }
)

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