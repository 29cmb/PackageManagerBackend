const fs = require('fs')
const path = require('path')
module.exports = function(app){
    app.post("/download", function(req, res){
        const { body } = req
        if(!body){
            res.status(400).send("Body not provided")
            return
        }

        const { ID } = body
        if(!ID){
            res.status(400).send("ID not provided")
            return
        }

        const libs = require("../libs.json")
        const item = libs.find(src => src.ID === ID)

        if(!item){
            res.status(404).send("Could not find item of the ID provided")
            return;
        }

        item.Downloads++

        fs.writeFileSync(path.join(__dirname, "../libs.json"), JSON.stringify(libs, null, 2))

        res.send(item.Serialized)
    })

    console.log("✅ | [API] `/download` has been set up")
}