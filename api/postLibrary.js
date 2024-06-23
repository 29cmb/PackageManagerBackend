const fs = require('fs');
const path = require('path');

module.exports = function(app){
    app.post("/postLib", (req, res) => {
        var { body } = req;

        if (!body) {
            res.status(400).send('No body provided');
            return
        }

        var { Name, Author, Description, Serialized } = body;
        
        if(!Name || !Author || !Description || !Serialized){
            res.status(400).send("Proper fields were not provided")
            return
        }

        const filePath = path.join(__dirname, '../unapprovedLibs.json');
        let unapprovedLibs = require(filePath);
        
        const data = {
            "ID": makeid(10),
            "Name": Name,
            "Author": Author,
            "Description": Description,
            "Downloads": 0,
            "Serialized": JSON.parse(Serialized) // Ensure Serialized is properly parsed
        };

        unapprovedLibs.push(data);

        const jsonString = JSON.stringify(unapprovedLibs, null, 2);

        fs.writeFile(filePath, jsonString, (err) => {
            if (err) {
                console.error(`Error writing file: ${err}`);
                res.status(500).send('Server error');
                return;
            }

            console.log(`Added package '${Name}' by ${Author} to unapproved library list`);
            res.status(200).send(`Package '${Name}' added successfully`);
        });
    });
}

// Function to generate a random ID
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
