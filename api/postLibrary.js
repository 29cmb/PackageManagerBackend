const fs = require('fs')
module.exports = function(app){
    app.post("/postLib", (req, res) => {
        var { body } = req
        if (body == undefined) return;

        var { Name, Author, Description, Serialized } = body

        const unapprovedLibs = require("../unapprovedLibs.json")
        const data = {
            "ID": makeid(10),
            "Name": Name,
            "Author": Author,
            "Description": Description,
            "Downloads": 0,
            "Serialized": JSON.parse(Serialized) // SHOULD be stringified (hopefully)
        }

        unapprovedLibs.push(data)

        fs.writeFile("../unapprovedLibs.json", JSON.stringify(unapprovedLibs, null, 2), (err) => {
            if(err){
                return console.error(`Error writing file: ${err}`)
            }

            console.log(`Added package '${Name}' by ${Author} to unapproved library list`)
        })
    })
}

// stack overflow my beloved
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}