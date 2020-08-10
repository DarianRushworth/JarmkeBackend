const User = require("./models").user
// console.log("user test", User)
const Order = require("./models").order
// console.log("order test", Order)
const Product = require("./models").product
// console.log("product test", Product)
const Category = require("./models").category
// console.log("category test", Category)

async function findUsers(){
    try{
        const response = await User.findAll()
        // console.log("found user test", response)

        const usersFound = response.map(user => 
            user.get({
                plain: true
            })
        )
        console.log("plain user test", usersFound)

    } catch(error){
        console.log(error.message)
    }
}
// findUsers()

async function findProduct(productId){
    try{
        const response = await Product.findByPk(productId)
        // console.log("product by ID", response)

        const product = response
                        ? response.get({
                            plain: true
                        })
                        : "Product ID entered did not match please re-check and try again"
        console.log("product test", product)


    } catch(error){
        console.log(error.message)
    }
}
// findProduct(4)

async function findOrders(){
    try{
        const response = await Order.findAll()
        console.log("orders found test", response)

    } catch(error){
        console.log(error.message)
    }
}
findOrders()

async function findCategory(productId){
    try{
        const response = await Category.findByPk(productId)
        console.log("category by title", response)

    } catch(error){
        console.log(error.message)
    }
}
findCategory(4)