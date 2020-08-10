const { Router } = require("express")

const Products = require("../models").product

const router = new Router()

router.get(
    "/products/:id",
    async(req, res) => {
        const idNeeded = parseInt(req.params.id)
        try{
            const response = await Products.findByPk(idNeeded)
            // console.log("response test", response)

            if(!response){
                res.status(404).send("The product you are looking for has dissappeared, we are working on it")
            }

            const sendProduct = response
                                ? response
                                : "Loading..."
            
            res.status(202).send(sendProduct)

        } catch(error){
            console.log(error.message)
        }
    }
)

router.get(
    "/products",
    async(req, res) => {
        try{
            const response = await Products.findAll()
            // console.log("products test", response)

            const sendProducts = response
                                ? response
                                : "Loading..."
            
            res.status(202).send(sendProducts)

        } catch(error){
            console.log(error.message)
        }
    }
)

module.exports = router