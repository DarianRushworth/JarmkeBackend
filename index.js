const express = require("express")
const loggerMiddleWare = require("morgan")
const corsMiddleWare = require("cors")
const { PORT } = require("./config/constants")
const authMiddleWare = require("./auth/middleware")

const authRouter = require("./routers/auth")
const productsRouter = require("./routers/productsPageRouter")
const favoriteProductRouter = require("./routers/favoritesRouter")
const cartRouter = require("./routers/shoppingCartRouter")

const app = express()

app.use(loggerMiddleWare("dev"))

const bodyParserMiddleWare = express.json()
app.use(bodyParserMiddleWare)

app.use(corsMiddleWare())

if (process.env.DELAY) {
    app.use((req, res, next) => {
      setTimeout(() => next(), parseInt(process.env.DELAY))
    })
  }

app.use(productsRouter)
app.use(favoriteProductRouter)
app.use(cartRouter)

app.use("/", authRouter)

app.listen(
    PORT, 
    () => {
    console.log(`Listening on port: ${PORT}`)
})