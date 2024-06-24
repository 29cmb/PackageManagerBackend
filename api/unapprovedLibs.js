const path = require("path")
module.exports = function(app){
    app.get("/unapprovedLibs", (req, res) => {
        res.send(require(path.join(__dirname, "/../unapprovedLibs.json")))
    })

    console.log("✅ | [API] `/unapprovedLibs` has been set up")
}