const { Router } = require("express")

const authMiddleWare = require("../auth/middleware")

const UserFavorites = require("../models").userFavorite

const router = new Router

router.get(
    "/favorites",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = parseInt(req.user.id)
        // console.log("(GET)id test user:", userIdNeeded)

        try{
            const response = await UserFavorites.findAll({
                where: {
                    userId: userIdNeeded
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
    async(req, res) => {
        const userIdNeeded = req.user.id
        // console.log("id test user:", userIdNeeded)
        const productIdNeeded = parseInt(req.params.id)
        // console.log("id test product:", productIdNeeded)
        try{
            const response = await UserFavorites.create({
                productId: productIdNeeded,
                userId: userIdNeeded,
            })
            // console.log("response test", response)
            res.status(202).send(response)

        } catch(error){
            console.log(error.message)
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
            // console.log("Individual favorite test", response)

            if(!response){
                res.status(404).send("No Favorite matched your request.")
            }

            response.destroy()
            res.status(202).send("Not your Favorite.")

        } catch(error){
            console.log(error.message)
        }
    }
)

module.exports = router