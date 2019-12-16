//jshint esversion: 6

const express = require("express");
const bodyParser = require ("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
    // console.log(req);
})

app.post("/", function(req, res){

    var crypto = req.body.crypto;
    var change = req.body.change
    var amount = req.body.amount;
    const url = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"

    var options = {
        url: "https://apiv2.bitcoinaverage.com/convert/global",
        qs: {
            from: crypto,
            to: change,
            amout: amount
        }
    }

    // document.querySelector("btc").innerHTML;

    console.log(req);

    var jsonRes;

    request(options, function(err, response, body){

        jsonRes = JSON.parse(body);
        console.log(jsonRes);

        res.write("<p>The current timestamp is " + jsonRes.time+"</p>")
        res.write("<h1>The price of "+crypto+" is "+jsonRes.price+change+"<h1>")

        res.send();
    })    
})

app.listen(3000, function(){
    console.log("Running");
});