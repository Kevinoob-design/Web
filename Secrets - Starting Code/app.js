//jshint esversion:6
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const bodyParser = require("body-parser");
var bcrypt = require('bcrypt');
const saltRounds = 10;


const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true
});

userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

console.log(process.env.SECRET);

const User = mongoose.model("User", userSchema);

app.listen(3000, function () {
    console.log("Running");
});

app.get("/", function (req, res) {
    res.render("home");
});

app.route("/login").get(function (req, res) {
    res.render("login");

}).post(function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, function (err, hash) {

        User.findOne({
            email: username
        }, function (err, found) {
            if (err) {
                console.log(err);
            } else {
                if (found) {
                    bcrypt.compare(password, hash, function (err, resp) {
                        res.render("secrets");
                    });
                }
            }
        });
    });
});

app.route("/register").get(function (req, res) {
    res.render("register");

}).post(function (req, res) {

    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {

        const newUser = new User({
            email: req.body.username,
            password: hash
        });

        newUser.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                res.render("secrets");
            }
        });
    });
});