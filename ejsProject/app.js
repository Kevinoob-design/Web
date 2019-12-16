//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname+"/date.js");
console.log(date);

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log("Runnig");
})

let items = [];
let workItems = [];
let page = "list";

app.get("/", function (req, res) {

    // console.log(req);

    res.render("index", {renderBody: page, listTitle: date.getDay(), newListItems: items });

    console.log(items);
})

app.get("/work", function(req, res){

    res.render("index", {renderBody: page, listTitle: "work", newListItems: workItems});
})

app.post("/", function(req, res){
    console.log(req);

    

    if(req.body.list === "work"){
        workItems.push(req.body.newItem);
        res.redirect("/work");
    }
    else{
        items.push(req.body.newItem);
        res.redirect("/");
    }
})

app.post("/work", function(req, res){

    workItems.push(req.body.newItem);
    res.redirect("/work");
})