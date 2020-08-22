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
        // console.log("user id:", userIdNeeded)
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself.")
        }

        const newAddress = req.body.shippingAddress
        if(!newAddress){
            res.status(400).send("Please enter a valid address.")
        }

        try{
            const updateOrder = await Order.update({
                shippingAddress: newAddress
            },{
                where: {
                    userId: userIdNeeded,
                    completed: false,
                }
            })
            // console.log("update order test", updateOrder)
            if(!updateOrder){
                res.status(404).send("Order couldn't be found, please refresh and try again.")
            }
            
            const sendUpdateOrder = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    shippingAddress: newAddress,
                    completed: false,
                }
            })
            if(!sendUpdateOrder){
                res.status(404).send("Couldn't find your order, please refresh and try again.")
            }

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
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself.")
        }
        
        const orders = req.user.orders
        // console.log("user's orders", orders)
        if(!orders){
            res.status(404).send("Sorry it seems you have no orders, please add products to cart to create an order.")
        }


        const shipping = req.body.expressShipping === "true"
                        ? true
                        : false
        // console.log("body request test", shipping)
        if(!shipping){
            res.status(400).send("Please enter a valid choice for Express Shipping.")
        }

        try{
            const orderNeeded = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    completed: false
                }
            })
            // console.log("one object test", orderNeeded)
            if(!orderNeeded){
                res.status(404).send("It seems you have no orders, please add a product to cart to create an order.")
            }
            
            if(shipping === false && orderNeeded.expressShipping === false){
                res.status(202).send(orderNeeded)
            } else if(shipping === false && orderNeeded.expressShipping === true){
                const reviseOrder = await orderNeeded.update({
                    expressShipping: shipping
                })
                if(!reviseOrder){
                    res.status(400).send("Order couldn't be updated, please refresh and try again.")
                }

                const minusShipping = await orderNeeded.decrement("total", {by: 50})
                if(!minusShipping){
                    res.status(400).send("Total couldn't be decreased, please check total and try again.")
                }

                const updateUser = await User.findByPk(userIdNeeded,{
                    include: [Order]
                })
                if(!updateUser){
                    res.status(404).send("User wasnt't found please refresh/Login and try again.")
                }

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
            if(!orderUpdate){
                res.status(400).send("Shippimg wasn't updated please refresh, check total, and try again.")
            }

            const orderTotalRevised = await orderNeeded.increment("total", {by: 50})
            // console.log("total increase test", orderTotalRevised)
            if(!orderTotalRevised){
                res.status(400).send("Total of Shipping cost wasn't updated, please check total, refresh and try again.")
            }

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })
            // console.log("updated user test", updateUser)
            if(!updateUser){
                res.status(404).send("User couldn't be found, please refresh, and login again.")
            }

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
        if(!req.user){
            res.status(401).send("Sorry you aren't authorized, Login/Sign-up to authorize yourself.")
        }
        const orderIdNeeded = parseInt(req.params.id)
        // console.log("order id Needed", orderIdNeeded)
        if(!orderIdNeeded){
            res.status(404).send("Order's ID couldn't be found, refresh and try again.")
        }

        try{
            const orderedProducts = await Order.findOne({
                include: [Products],
                where:{
                    id: orderIdNeeded
                }
            })
            // console.log("response test", orderedProducts)
            if(!orderedProducts){
                res.status(404).send("Your order wasn't found, please refresh and try again.")
            }
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
        if(!orderIdNeeded){
            res.status(404).send("order's ID couldn't be found, please refresh and try again.")
        }

        const productIdNeeded = parseInt(req.params.pId)
        // console.log("product id test:", productIdNeeded)
        if(!productIdNeeded){
            res.status(404).send("product's ID couldn't be found, please refresh and try again.")
        }


        const userIdNeeded = req.user.id
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, please Login/Sign-up to authorize yourself.")
        }

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
            if(!product){
                res.status(404).send("That product was't found, please refresh and try again.")
            }

            const orderSpecifc = await Order.findOne({
                include: [Products],
                where: {
                    userId: userIdNeeded,
                    completed: false,
                }
            })
            if(!orderSpecifc){
                res.status(404).send("order not found, please refresh and try again.")
            }
            
            const orderSubtract = await orderSpecifc.decrement("total", { by: product.price})
            const orderChange = await orderSubtract.decrement("productAmount", {by: 1})
            if(!orderSubtract){
                res.status(400).send("Total was updated, please check total, refresh and try again.")
            } else if(!orderChange){
                res.status(400).send("Please check that the product was subtracted if not, refresh and try again.")
            }

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })
            if(!updateUser){
                res.status(404).send("User couldn't be found, please Login/Sign-up to find yourself.")
            }

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
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself.")
        }

        const orderNeeded = req.user.orders
        // console.log("here's the orders", orderNeeded)
        if(!orderNeeded){
            res.status(404).send("It seem's if you dont have any open orders, please add a product to cart to start one.")
        }
        
        const productIdNeeded = parseInt(req.params.id)
        // console.log("(Cart)product id:", productIdNeeded)
        if(!productIdNeeded){
            res.status(404).send("product's ID couldn't be found, please refresh and try again.")
        }
        
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
            if(!orderMade){
                res.status(400).send("An order couldn't be created, please refresh and try again.")
            }

            const productOrdered = await Products.findByPk(productIdNeeded)
            if(!productOrdered){
                res.status(404).send("Product wasn't found, please refresh and try again.")
            }

            const userOrder = await Order.findByPk(createOrNot.id, {
                include: [Products],
            })
            if(!userOrder){
                res.status(404).send("Order couldn't be found, please refresh and try again.")
            }

            const orderRevised = await userOrder.increment("total", {by: productOrdered.price})
            const productRevised = await orderRevised.increment("productAmount", {by: 1})
            if(!orderRevised){
                res.status(400).send("Total wasnt updated, please check the total and refresh.")
            } else if(!productRevised){
                res.status(404).send("Your product wasn't added please refresh and try again.")
            }

            const updateUser = await User.findByPk(userIdNeeded,{
                include: [Order]
            })
            if(!updateUser){
                res.status(404).send("User not found, please Login to find yourself.")
            }

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