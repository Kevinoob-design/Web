const express = require("express");
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/register", function(req, res){

    var email = req.body.email;
    var pass = req.body.password;

    res.send("This is what you send: " + email + " " + pass);
})

app.listen(4000);