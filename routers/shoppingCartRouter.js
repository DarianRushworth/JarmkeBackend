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
                include: [Products],
                where: {
                    userId: userIdNeeded
                }
            })

            const orderRevised = await orderSpecifc.decrement("total", { by: product.price})
            res.status(202).send({
                order: orderRevised,
                notInCart: orderSpecifc,
            })

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

        const orderNeeded = req.user.orders
        console.log("here's the orders", orderNeeded)
        
        
        const productIdNeeded = parseInt(req.params.id)
        console.log("(Cart)product id:", productIdNeeded)
        

        try{
            const locateOrder = orderNeeded.find(order => order.completed === false)
            const createOrNot= locateOrder
                                ? locateOrder
                                : await Order.create({
                                    total: 0,
                                    userId: userIdNeeded,
                                    expressShipping: false,
                                    completed: false,
                                })
            console.log("found order", locateOrder)
            console.log("what should I do", createOrNot)
            
            const orderMade = await OrderProducts.create({
                orderId: createOrNot.id,
                productId: productIdNeeded,
            })
            // console.log("response test", orderMade)
            const productOrdered = await Products.findByPk(productIdNeeded)

            const userOrder = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded
                }
            })

            const orderRevised = await userOrder.increment("total", {by: productOrdered.price})
            res.status(202).send({
                order: orderRevised,
                newIncart: userOrder
            })
            

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router