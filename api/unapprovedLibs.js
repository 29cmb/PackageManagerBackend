const path = require("path")
module.exports = function(app){
    app.get("/libs", (req, res) => {
        res.send(require(path.join(__dirname, "/../unapprovedLibs.json")))
    })

    console.log("✅ | [API] `/libs` has been set up")
}