const { Router } = require("express")

const authMiddleware = require("../auth/middleware")
const OrderProducts = require("../models").orderProduct
const Order = require("../models").order
const Products = require("../models").product
const User = require("../models").user

const router = new Router()

router.patch(
    "/updateAddress",
    authMiddleware,
    async(req, res) => {
        const userIdNeeded = req.user.id
        console.log("user id:", userIdNeeded)

        const newAddress = req.body.shippingAddress

        try{
            const updateOrder = await Order.update({
                shippingAddress: newAddress
            },{
                where: {
                    userId: userIdNeeded,
                    completed: false,
                }
            })
            console.log(updateOrder)
            
            const sendUpdateOrder = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    shippingAddress: newAddress,
                    completed: false,
                }
            })
            res.status(202).send(sendUpdateOrder)

        } catch(error){
            console.log(error.message)
        }
    }
)

router.patch(
    "/checkout/updateCart",
    authMiddleware,
    async(req, res) => {
        const userIdNeeded = req.user.id
        // console.log("(updateCART)user id:", userIdNeeded)
        
        const orders = req.user.orders
        // console.log("user's orders", orders)


        const shipping = req.body.expressShipping === "true"
                        ? true
                        : false
        // console.log("body request test", shipping)

        try{
            const orderNeeded = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    completed: false
                }
            })
            // console.log("one object test", orderNeeded)
            
            if(shipping === false && orderNeeded.expressShipping === false){
                res.status(202).send(orderNeeded)
            } else if(shipping === false && orderNeeded.expressShipping === true){
                const reviseOrder = await orderNeeded.update({
                    expressShipping: shipping
                })

                const minusShipping = await orderNeeded.decrement("total", {by: 50})

                const updateUser = await User.findByPk(userIdNeeded,{
                    include: [Order]
                })

                res.status(202).send({
                    user: updateUser,
                    order: minusShipping,
                })
            } else {
            const orderUpdate = await Order.update({
                expressShipping: shipping
            },{
                where: {
                    id: orderNeeded.id,
                    completed: false,
                }
            })
            // console.log("shipping updated test", orderUpdate)

            const orderTotalRevised = await orderNeeded.increment("total", {by: 50})
            console.log("total increase test", orderTotalRevised)

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })
            console.log("updated user test", updateUser)

            res.status(202).send({
                user: updateUser,
                order: orderTotalRevised,
            })
        }

        } catch(error){
            console.log(error.message)
        }
    }
)

router.get(
    "/checkout/:id",
    authMiddleware,
    async(req, res) => {
        const orderIdNeeded = parseInt(req.params.id)
        // console.log("order id Needed", orderIdNeeded)

        try{
            const orderedProducts = await Order.findOne({
                include: [Products],
                where:{
                    id: orderIdNeeded
                }
            })
            // console.log("response test", orderedProducts)
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
        // console.log("order id test:", orderIdNeeded)

        const productIdNeeded = parseInt(req.params.pId)
        // console.log("product id test:", productIdNeeded)


        const userIdNeeded = req.user.id

        try{
            const orderProductRemoved = await OrderProducts.findOne({
                where: {
                    orderId: orderIdNeeded,
                    productId: productIdNeeded,
                }
            })
            // console.log("orderProducts test", orderProductRemoved)

            if(!orderProductRemoved){
                res.status(404).send("Oops, something went wrong, refresh and try again.")
            }

            orderProductRemoved.destroy()
            // res.status(202).send("Deletion Successful")

            const product = await Products.findByPk(productIdNeeded)
            // console.log("found product price test", product.price)

            const orderSpecifc = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    completed: false,
                }
            })
            
            const orderSubtract = await orderSpecifc.decrement("total", { by: product.price})
            const orderChange = await orderSubtract.decrement("productAmount", {by: 1})

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })

            res.status(202).send({
                order: orderChange,
                notInCart: orderSpecifc,
                user: updateUser
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
        // console.log("here's the orders", orderNeeded)
        
        
        const productIdNeeded = parseInt(req.params.id)
        // console.log("(Cart)product id:", productIdNeeded)
        

        try{
            const locateOrder = orderNeeded.find(order => order.completed === false)
            const createOrNot= locateOrder
                                ? locateOrder
                                : await Order.create({
                                    total: 0,
                                    userId: userIdNeeded,
                                    productAmount: 0,
                                    expressShipping: false,
                                    shippingAddress: "User Address",
                                    completed: false,
                                })
            // console.log("found order", locateOrder)
            // console.log("what should I do", createOrNot)
            
            const orderMade = await OrderProducts.create({
                orderId: createOrNot.id,
                productId: productIdNeeded,
            })
            // console.log("response test", orderMade)
            const productOrdered = await Products.findByPk(productIdNeeded)

            const userOrder = await Order.findOne({
                include: [Products],
                where: {
                    id: createOrNot.id
                }
            })

            const orderRevised = await userOrder.increment("total", {by: productOrdered.price})
            const productRevised = await orderRevised.increment("productAmount", {by: 1})

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })

            res.status(202).send({
                order: productRevised,
                newIncart: userOrder,
                user: updateUser
            })
            

        } catch(error){
            console.log(error.message)
        }
    }
)


module.exports = router