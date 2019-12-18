//jshint esversion:8

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/todoListDB", {
    useNewUrlParser: true
});

const schemaDB = new mongoose.Schema({

    "item": {
        type: String,
        required: true
    },
    "check": Boolean
});

const ObjectDB = mongoose.model("Item", schemaDB);

module.exports.save = function (obj) {

    ObjectDB.insertMany(obj, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("success saving!!");
        }
    });

    // mongoose.connection.close();
};

module.exports.find = function(res){

    ObjectDB.find(function(err, result){
        if(err){
            console.log(err);
        }else{
            console.log(result);
        }
    });
};

