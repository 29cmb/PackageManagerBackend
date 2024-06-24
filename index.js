const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

require("dotenv").config()
app.use(express.json({ limit: '75mb' }));
app.use(express.urlencoded({ limit: '75mb', extended: true }));

app.use(express.static(path.join(__dirname, "views")));

app.listen(3000, () => {
    console.log("👍 API is listening")
})

// API Routes
fs.readdirSync(path.join(__dirname, 'api')).forEach(file => {
    if (path.extname(file) === '.js') {
        require(`./api/${file}`)(app);
    }
});