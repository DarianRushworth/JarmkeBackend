const { Router } = require("express")

const authMiddleWare = require("../auth/middleware")

const User = require("../models").user
const Product = require("../models").product
const UserFavorites = require("../models").userFavorite

const router = new Router()

router.get(
    "/fav",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = parseInt(req.user.id)
        // console.log("(GET)id test user:", userIdNeeded)
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself")
        }

        try{
            const user = await User.findOne({
                include: [Product],
                where: {
                    id: userIdNeeded
                }
            })
            // console.log("response test", user)

            if(!user){
                res.status(404).send("Oo gosh you've got no Favorites, better start clicking.")
            }

            res.status(202).send(user)

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
        // console.log("id test user:", userIdNeeded)
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself")
        }

        const productIdNeeded = parseInt(req.params.id)
        // console.log("id test product:", productIdNeeded)

        try{
            const favorite = await UserFavorites.create({
                productId: productIdNeeded,
                userId: userIdNeeded,
            })
            // console.log("response test", favorite)
            if(!favorite){
                res.status(400).send("favorite couldn't be added, refresh and try again")
            }
            const productNeeded = await Product.findByPk(productIdNeeded)
            
            if(!productNeeded){
                res.status(404).send("Product with that ID doesn't exist, please refresh and try again")
            }
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
        if(!userIdNeeded){
            res.status(401).send("Sorry you are unauthorized, Login/Sign-up to authorize yourself")
        }
        
        const productIdNeeded = parseInt(req.params.id)
        // console.log("(Delete)id test product:", productIdNeeded)
       
        try{
            const favorite = await UserFavorites.findOne({
                where: {
                    userId: userIdNeeded,
                    productId: productIdNeeded
                }
            })
            // console.log("Individual favorite test", favorite)

            if(!favorite){
                res.status(404).send("No Favorite matched your request, refresh and try again.")
            }

            
            const productNeeded = await Product.findOne({
                where: {
                    id: productIdNeeded
                }
            })

            if(!productNeeded){
                res.status(404).send("No product found, refresh and try again.")
            }
            
            favorite.destroy()
            res.status(202).send(productNeeded)

        } catch(error){
            console.log(error.message)
        }
    }
)

module.exports = router