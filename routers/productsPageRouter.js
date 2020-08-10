const { Router } = require("express")

const Products = require("../models").product

const router = new Router()

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