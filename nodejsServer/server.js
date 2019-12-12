//jshint esversion:6

const express = require('express');
var bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
})

app.post("/", function(req, res){

    res.send("The result of your calculation is: "+ Number(req.body.num1) + Number(req.body.num2)); 
})

app.get("/bmiCalculator", function(req, res){
    res.sendFile(__dirname+"/bmiCalculator.html")
})

app.post("/bmiCalculator", function(req, res){

    var w = Number(req.body.weight);
    var h = Number(req.body.height);

    var result = w / Math.pow(h, 2);

    res.send("Your result is: " + result);
})

app.listen(3000, function(){
    console.log("Server has started");
})