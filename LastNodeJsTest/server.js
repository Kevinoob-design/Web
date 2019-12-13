const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

var username = "hola@hotmail.com";
var code = "1234";

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/choice", function(req, res){

    res.sendFile(__dirname+"/choice.html")

    var email = req.body.email;
    var pass = req.body.pass;

    if (username === email && code === pass) {
        res.send("<h1>"+email+"<h1>"+"<h1>"+pass+"<h1>");
    }
    else{
        res.send("<h1>The credentials you enter were incorrect<h1>");
    }

    console.log(req);    
})

app.listen(3000);