const { Router } = require("express")

const User = require("../models").user

const router = new Router()

router.get(
    "/me",
    async(req, res) => {
        try{
            const response = await User.findOne({
                where: {
                    isOwner: true
                }
            })
            res.status(202).send(response)

        } catch(error){
            console.log(error.message)
        }
    } 
)


module.exports = router