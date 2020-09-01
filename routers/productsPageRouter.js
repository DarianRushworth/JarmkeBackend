const { Router } = require("express")

const Products = require("../models").product

const router = new Router()

router.get(
    "/products/:id",
    async(req, res) => {
        const idNeeded = parseInt(req.params.id)
        if(!idNeeded){
            res.status(400).send("Couldn't pick up the product ID, please refresh and try again.")
        }

        try{
            const product = await Products.findByPk(idNeeded)
            // console.log("response test", response)

            const sendProduct = product
                                ? res.status(202).send(product)
                                : res.status(404).send("The product you are looking for has dissappeared, we are working on it")
            

        } catch(error){
            console.log(error.message)
        }
    }
)

router.get(
    "/products",
    async(req, res, next) => {
        const limit = req.query.limit || 6
        const offset = req.query.offset || 0

        try{
            const products = await Products.findAndCountAll({limit, offset})
            // console.log("products test", products)

            .then((result) => res.status(202).send({
                products: result.rows,
                total: result.count
            }))
            
            if(!products){
                res.status(404).send("Products couldn't be found, please refresh and try again.")
            }


        } catch(error){
            console.log(error.message)
        }
    }
)

module.exports = router