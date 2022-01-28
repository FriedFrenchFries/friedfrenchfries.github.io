console.log("Server-side code running");

const express = require("express");
const path = require("path");
const { MongoClient } = require("mongodb");
const keymodel = require("../models/key.js");

const app = express();

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    "mongodb+srv://mimsical:KpPiRUztUJSt6ty@cluster0.inbci.mongodb.net/test?retryWrites=true&w=majority";

  /**
   * The Mongo Client you will use to interact with your database
   * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
   * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
   * pass option { useUnifiedTopology: true } to the MongoClient constructor.
   * const client =  new MongoClient(uri, {useUnifiedTopology: true})
   */
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
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

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */

let keydoc = await keymodel.findOne({
  fillerfind: 0
});


if(!keydoc) {
  console.log("Making new keymodel")
  keydoc = new keymodel({
    fillerfind:0,
    validkeys: [
      "rrtr334"
    ]
  })
}

await keydoc.save()

async function getKeys() {
    let keydoc = await keymodel.findOne({
        fillerfind: 0
      });
      
      
      if(!keydoc) {
        console.log("Making new keymodel")
        keydoc = new keymodel({
          fillerfind:0,
          validkeys: [
            "rrtr334"
          ]
        })
      }
      await keydoc.save()
}
async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
