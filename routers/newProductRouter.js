const { Router } = require("express")

const authMiddleware = require("../auth/middleware")
const Products = require("../models").product

const router = new Router()

router.delete(
    "/deleteProduct/:id",
    authMiddleware,
    async(req, res) => {
        const owner = req.user.isOwner
        // console.log("owner test", owner)
        if(!owner){
            res.status(401).send("Sorry you are not the owner, only the Owner can gain access")
        }

        const productIdNeeded = req.params.id
        // console.log("prduct Id:", productIdNeeded)

        try{
            const whatToDo = owner
                                ? await Products.findByPk(productIdNeeded)
                                : res.status(401).send("Sorry but you are not the Owner.")
            // console.log("response test", whatToDo)
            
            if(!whatToDo){
                res.status(404).send("No product matched that information, refresh and try again.")
            }

            whatToDo.destroy()
            res.status(202).send("Deletion successful.")

        } catch(error){
            console.log(error.message)
        }
    }
)

router.post(
    "/newProduct",
    authMiddleware,
    async(req, res, next) => {
        const owner = req.user.isOwner
        // console.log("user details test", owner)
        if(!owner){
            res.status(401).send("Sorry you are not the owner, only the Owner can gain access")
        }

        const {
            title,
            description,
            price,
            categoryId,
            unitsInStock,
            metal,
            image,
            stoneColor
        } = req.body

        const intUnitsInStock = parseInt(unitsInStock)
        const intCategoryId = parseInt(categoryId)
        const intPrice = parseInt(price)
        // console.log("body test", req.body)

        try{

            if(!title || ! description || !price || !categoryId || !unitsInStock || !metal || !image){
                res.status(400).send("Please enter valid; Title, Description, Price, category, Units In Stock, Metal and Image")
            }

            const whatToDo = owner
                                ? await Products.create({
                                    title,
                                    description,
                                    price: intPrice,
                                    categoryId: intCategoryId,
                                    unitsInStock: intUnitsInStock,
                                    metal,
                                    image,
                                    stoneColor
                                })
                                : res.status(401).send("Sorry but you are not the Owner.")
            // console.log("response test", response)

            if(!whatToDo){
                res.status(400).send("Product couldn't be created, refresh and try again.")
            }
            
            res.status(202).send(whatToDo)

        } catch(error){
            console.log("This is error", error.message)
            next(error)
        }
    }
)

module.exports = router