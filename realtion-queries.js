const { response } = require("express")

const User = require("./models").user
// console.log("user test", User)
const Order = require("./models").order
// console.log("order test", Order)
const Product = require("./models").product
// console.log("product test", Product)
const Category = require("./models").category
// console.log("category test", Category)

async function findOrderProducts(orderId){
    try{
        const response = await Order.findByPk(orderId, {
            include: [Product]
        })
        // console.log("order test", response)
        
        const productsOrdered = response
                                ? response.get({
                                    plain: true
                                })
                                : "No Order found by that ID, please re-check and try again."
        // console.log("products ordered test", productsOrdered)

    } catch(error){
        console.log(error.message)
    }
}
// findOrderProducts(1)

async function findUserFavorites(userId){
    try{
        const response = await User.findByPk(userId, {
            include: [Product]
        })
        // console.log("products favorited test", response)

        const userFavorites = response
                                ? response.get({
                                    plain: true
                                })
                                : "No Order found by that ID, please re-check and try again."
        console.log("user's favorites test", userFavorites)
    } catch(error){
        console.log(error.message)
    }
}
findUserFavorites(2)