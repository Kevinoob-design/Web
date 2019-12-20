//jshint esversion:6

const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const _ = require("lodash");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/wikiDB", {
    useNewUrlParser: true
});

const articleSchema = mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);

app.listen(process.env.PORT || 3000, function () {
    console.log("Runnig ");
});

app.route("/articles").get(function (req, res) {
    Article.find({}, function (err, resp) {

        if (err) {
            res.send(err);
        } else {
            res.send(resp);
        }
    });
}).post(function (req, res) {
    const article = new Article({

        title: req.body.title,
        content: req.body.content
    });

    article.save(function (err) {

        if (err) {
            res.send(err);
        } else {
            res.redirect("/articles");
        }
    });
}).delete(function (req, res) {

    console.log(req.body);

    Article.deleteMany({}, function (err) {
        if (err) {
            res.send(err);
        } else {
            res.redirect("/articles");
        }
    });
});

app.route("/articles/:articleTitle").get(function (req, res) {

    console.log(req.params.articleTitle);

    Article.findOne({title: req.params.articleTitle}, function (err, resp) {

        if (err) {
            res.send(err);
        } else {
            console.log(resp);
            res.send(resp);
        }
    });
}).put(function (req, res) {

    Article.update({ title: req.params.articleTitle }, { title: req.body.title , content: req.body.content }, {overwrite: true}, function (err, resp){
        if(err){
            res.send(err);
        }else{
            res.redirect("/articles/" + req.body.title);
        }
    });
}).patch(function(req, res){

    Article.update({ title: req.params.articleTitle}, {$set: req.body}, function(err){
        if(err){
            res.send(err);
        }else{
            res.redirect("/articles");
        }
    });
}).delete(function(req, res){
    Article.deleteOne({ title: req.params.articleTitle}, function(err){
        if(err){
            res.send(err);
        }else{
            res.redirect("/articles");
        }
    })
});