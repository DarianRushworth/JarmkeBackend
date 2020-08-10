const { Router } = require("express")

const authMiddleWare = require("../auth/middleware")

const UserFavorites = require("../models").userFavorite

const router = new Router

router.post(
    "/products/:id",
    authMiddleWare,
    async(req, res) => {
        const userIdNeeded = req.user.id
        console.log("id test user:", userIdNeeded)
        const productIdNeeded = parseInt(req.params.id)
        console.log("id test product:", productIdNeeded)
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

module.exports = router