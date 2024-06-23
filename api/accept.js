const crypto = require("crypto")
const fs = require('fs')
const path = require("path")
module.exports = function(app){
    app.post("/accept", (req, res) => {
        const { body } = req
        if(!body){
            res.status(400).send("Body not provided")
            return
        }

        const { ID, Authorization } = body
        
        if(!ID || !Authorization){
            res.status(400).send("Missing ID or Authorization")
        }

        if(crypto.createHash("sha256").update(Authorization).digest("hex") == "b2a9ee69405d7fbdf59edcc3b87bebe5f95c652baaf2cb2b890d06d1d9c17bb3"){
            const unapprovedLibs = require("../unapprovedLibs.json")
            const index = unapprovedLibs.findIndex(src => src.ID === ID)
            if(index !== -1){
                const libs = require("../libs.json")
                const item = unapprovedLibs.splice(index, 1)[0]
                libs.push(item)

                fs.writeFileSync(path.join(__dirname, "../unapprovedLibs.json"), JSON.stringify(unapprovedLibs, null, 2))
                fs.writeFileSync(path.join(__dirname,"../libs.json"), JSON.stringify(libs, null, 2))

                res.status(200).send("Added to libs.json")
            }
        }
    })

    console.log("✅ | [API] `/accept` has been set up")
}