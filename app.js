console.log("Server-side code running");

 const express = require("express");
 const path = require("path");
 

 const app = express();

 
 const port = process.env.PORT || 3000;

 // sendFile will go here
 app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "/index.html"));
     res.sendFile(path.join(__dirname, "/index.html"));
 });

 app.listen(port);
