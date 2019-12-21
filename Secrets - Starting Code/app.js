//jshint esversion:6
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const findOrCreate = require('mongoose-findorcreate');

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "The key for this secret is you.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
    useNewUrlParser: true
});
mongoose.set("useCreateIndex", true);

userSchema = new mongoose.Schema({
    email: {
        type: String
        // required: true
    },
    password: {
        type: String
        // required: true
    },
    googleId: String,
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

// console.log(process.env.SECRET);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "https://localhost:3000/auth/google/secrets"
    },
    function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({
            googleId: profile.id
        }, function (err, user) {
            return cb(err, user);
        });
    }
));

app.listen(3000, function () {
    console.log("Running");
});

app.get("/", function (req, res) {
    res.render("home");
});

app.get('/auth/google',
    passport.authenticate('google', {
        scope: ["profile"]
    }));

    app.get('/auth/google/secrets',
        passport.authenticate('google', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            // Successful authentication, redirect to secrets.
            res.redirect('/secrets');
        });

app.route("/login").get(function (req, res) {
    res.render("login");

}).post(function (req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, function (err) {
        if (err) {
            console.log(err);
        } else {
            passport.authenticate("local");
            res.redirect("/secrets");
        }
    });
});

app.route("/register").get(function (req, res) {
    res.render("register");

}).post(function (req, res) {

    User.register({
            username: req.body.username
        }, req.body.password,
        function (err, user) {
            if (err) {
                console.log(err);
                res.redirect("/register");
            } else {
                passport.authenticate("local")(req, res, function () {
                    res.redirect("/secrets");
                });
            }
        });
});

app.route("/secrets").get(function (req, res) {
    // if (req.isAuthenticated()) {
    //     res.render("secrets");
    // } else {
    //     res.redirect("/login");
    // }

    User.find({"secret": {$ne:null}}, function(err, found){
        if(err){
            console.log(err);
        }else{
            res.render("secrets", {userSecret: found});
        }
    });
});

app.route("/submit").get(function(req, res){
    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }
}).post(function (req, res) {
    const submitterSecret = req.body.secret;

    User.findById(req.user.id, function(err, found){
        if(err){
            console.log(err);
        }else{
            if(found){
                found.secret = submitterSecret;
                found.save(function(){
                    res.redirect("/secrets");
                });
            }
        }
    });
});

app.route("/logout").get(function (req, res) {
    req.logOut();
    res.redirect("/");
});