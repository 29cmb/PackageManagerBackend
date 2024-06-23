const crypto = require("crypto")
const fs = require('fs')
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

        if(crypto.createHash("sha256").update(Authorization).digest("hex") == "a86af8436fbe392ff4d10c2bac2ee6489619d0c2598e181719e3e6d46a80fa8c"){
            const unapprovedLibs = require("../unapprovedLibs.json")
            const index = unapprovedLibs.findIndex(src => src.ID === ID)
            if(index !== -1){
                const libs = require("../libs.json")
                const item = unapprovedLibs.splice(index, 1)[0]
                libs.push(item)

                fs.writeFileSync("../unapprovedLibs.json", JSON.stringify(unapprovedLibs, null, 2))
                fs.writeFileSync("../libs.json", JSON.stringify(libs, null, 2))
            }
        }
    })
}