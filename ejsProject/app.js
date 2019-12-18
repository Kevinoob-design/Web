//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoListDB", {
    useNewUrlParser: true
});

const itemSchema = new mongoose.Schema({

    "name": {
        type: String,
        required: true
    }
});

const Item = mongoose.model("Item", itemSchema);

const listSchema = {

    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);

// const date = require(__dirname+"/date.js");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.listen(3000, function () {
    console.log("Runnig");
});

let workItems = [];
let page = "list";

app.get("/", function (req, res) {

    // console.log(req);

    Item.find({}, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);

            res.render("index", {
                renderBody: page,
                listTitle: "Today",
                newListItems: result
            });
        }
    });
});

app.get("/:param", function (req, res) {

    const customListName = _.capitalize(req.params.param);

    List.findOne({
        name: customListName
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log(result);

            if (!result) {
                const list = new List({
                    name: customListName,
                    items: [{
                        name: "default1"
                    }]
                });

                list.save();

                res.redirect("/" + customListName);
            } else {
                res.render("index", {
                    renderBody: page,
                    listTitle: customListName,
                    newListItems: result.items
                });
            }
        }
    });
});

app.post("/", function (req, res) {
    // console.log(req);

    const item = new Item({

        name: req.body.newItem
    });

    if (req.body.list === "Today") {
        item.save();
        res.redirect("/");
    } else {
        List.findOne({
            name: req.body.list
        }, function (err, result) {
            result.items.push(item);
            result.save();
            res.redirect("/" + req.body.list);
        });
    }
});

app.post("/delete", function (req, res) {

    if (req.body.listName === "Today") {
        Item.deleteOne({
            _id: req.body.checkBox
        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted");
            }
            res.redirect("/");
        });
    } else {
        List.findOneAndUpdate({
            name: req.body.listName
        }, {
            $pull: {
                items: {
                    _id: req.body.checkBox
                }
            }
        }, function (err, result) {
            if(!err){
                res.redirect("/"+req.body.listName);
            }else{
                console.log(err);
            }
        });
    }
});