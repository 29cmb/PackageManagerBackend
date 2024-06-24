# Roblox Library Manager Backend Server
The companion app for [the manager plugin](https://github.com/29cmb/PackageManagerPlugin)

You can both view libraries and send an ID to studio to import them.

## How to change the accept authentication key

1. load the crypto library using `require('crypto')`
2. Use the line `console.log(crypto.createHash("sha256").update("YourPassword").digest("hex"))` This will give you a long string of text, that is your hash
3. Go into api/accept.js and replace the hash there with your new one
4. Your new auth key has been set!
