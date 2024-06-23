const express = require('express')
const app = express()
const path = require('path')

require("dotenv").config()
app.use(express.json())
app.listen(process.env.PORT, () => {
    console.log("Backend ready")
})


require("./api/libs.js")(app)