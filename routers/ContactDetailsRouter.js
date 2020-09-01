const { Router } = require("express")

const User = require("../models").user

const router = new Router()

router.get(
    "/me",
    async(req, res) => {
        try{
            const user = await User.findOne({
                where: {
                    isOwner: true
                }
            })
            if(!user){
                res.status(404).send("Owner details no found, check Owner details.")
            }
            res.status(202).send(user)

        } catch(error){
            console.log(error.message)
        }
    } 
)


module.exports = router