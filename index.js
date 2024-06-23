const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

require("dotenv").config()
app.use(express.json())

app.listen(3000, () => {
    console.log("Backend ready")
})

// API Routes
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
    if (path.extname(file) === '.js') {
        require(`./api/${file}`)(app);
    }
});