const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const db = require("./database/connect");

db.connect();
app.get("/", (request, response) => {
    response.send("Homepage");
});

app.listen(PORT, (err) => { 
    console.log("Server běží.")
 });