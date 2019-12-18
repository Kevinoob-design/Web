//jshint esversion:6

 const mongoose = require('mongoose');

 mongoose.connect("mongodb://localhost:27017/fruitsDB");

 const fruitSchema = new mongoose.Schema({

    "name": String,
    rating: Number,
    review: String
 });

 const Fruit = mongoose.model("Fruit", fruitSchema);

 const uva = new Fruit({
     "name": "Uva",
     rating: 10,
     review: "Pretty solid as a fruit"
 });

 uva.save();

const personSchema = new mongoose.Schema({
   name: {type: String, required: [true, "no name specified"]},
   age: {type: Number, min: 1, max: 99},
   favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

// const kenobi = new Person({
//     name: "kenobi",
//     age: 99,
//     favoriteFruit: apple
// });

// Person.insertMany([wololo], function(err){
//     if (err) {
//         console.log(err);
//     }else{
//         console.log("success!");
//     }
// });

// var obj = [];

// Person.find(function(err, result){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(result);

//         obj = result;

//         obj.forEach(element => {
//             console.log(element.name);
//         });

//         mongoose.connection.close();
//     }
// });

// Person.updateOne({_id: "5df9a3cb58d8b17a68eca6d3"}, {"favoriteFruit": cherry} ,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("succsess");
//     }
// });

// Person.deleteMany({name: "lol"}, function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("succsess!!");
//     }
// });

// Person.deleteOne({name: "obiwan"}, function(err){
//    if(err){
//        console.log(err);
//    }else{
//        console.log("succsess!!");
//    }
// });