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

        const productIdNeeded = req.params.id
        console.log("prduct Id:", productIdNeeded)

        try{
            const response = owner
                                ? await Products.findOne({
                                    where: {
                                        id: productIdNeeded
                                    }
                                })
                                : res.status(401).send("Sorry but you are not the Owner.")
            // console.log("response test", response)
            response.destroy()
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
            const response = owner
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
            res.status(202).send(response)

        } catch(error){
            console.log("This is error", error.message)
            next(error)
        }
    }
)

module.exports = router