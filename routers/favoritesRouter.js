const { Router } = require("express")

const authMiddleWare = require("../auth/middleware")

const User = require("../models").user
const Product = require("../models").product
const UserFavorites = require("../models").userFavorite

const router = new Router()

router.get(
    "/",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = parseInt(req.user.id)
        // console.log("(GET)id test user:", userIdNeeded)

        try{
            const response = await User.findOne({
                include: [Product],
                where: {
                    id: userIdNeeded
                }
            })
            // console.log("response test", response)

            if(!response){
                res.status(404).send("Oo gosh you've got no Favorites, better start clicking.")
            }

            res.status(202).send(response)

        } catch(error){
            console.log(error.message)
        }
    }
)

router.post(
    "/products/:id",
    authMiddleWare,
    async(req, res, next) => {
        const userIdNeeded = req.user.id
        console.log("id test user:", userIdNeeded)
        const productIdNeeded = parseInt(req.params.id)
        // console.log("id test product:", productIdNeeded)
        try{
            const response = await UserFavorites.create({
                productId: productIdNeeded,
                userId: userIdNeeded,
            })
            // console.log("response test", response)
            const productNeeded = await Product.findAll({
                where: {
                    id: productIdNeeded
                }
            })
            
            res.status(202).send(productNeeded)

        } catch(error){
            console.log(error.message)
            next(error)
        }
    }
)

router.delete(
    "/products/:id",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = req.user.id
        // console.log("(Delete)id test user:", userIdNeeded)
        const productIdNeeded = parseInt(req.params.id)
        // console.log("(Delete)id test product:", productIdNeeded)
       
        try{
            const response = await UserFavorites.findOne({
                where: {
                    userId: userIdNeeded,
                    productId: productIdNeeded
                }
            })
            console.log("Individual favorite test", response)

            if(!response){
                res.status(404).send("No Favorite matched your request.")
            }

            
            const productNeeded = await Product.findOne({
                where: {
                    id: productIdNeeded
                }
            })
            response.destroy()
            res.status(202).send(productNeeded)

        } catch(error){
            console.log(error.message)
        }
    }
)

module.exports = router