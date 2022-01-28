console.log("Server-side code running");

const express = require("express");
const path = require("path");
const mongoose = require("mongoose")
const keymodel = require('./models/keys.js')

const app = express();

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri =
        "mongodb+srv://mimsical:KpPiRUztUJSt6ty@cluster0.inbci.mongodb.net/test?retryWrites=true&w=majority";


    try {
        // Connect to the MongoDB cluster
        await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true})


        // Make the appropriate DB calls
        await listDatabases();
    } catch (e) {
        console.error(e);
    }
}

const port = process.env.PORT || 3000;

// sendFile will go here
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

main().catch(console.error);
getKeys()
async function getKeys() {
    let keydoc = await keymodel.findOne({
        fillerfind: 0
    });


    if (!keydoc) {
        console.log("Making new keymodel")
        keydoc = new keymodel({
            fillerfind: 0,
            validkeys: [
                "rrtr334"
            ]
        })
    } 
    await keydoc.save()
}
async function listDatabases() {
    console.log("Databases:");
}
