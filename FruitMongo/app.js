//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require("assert");

const url = 'mongodb://localhost:27017/';

const dbName = "fruitsDB";

const client = new MongoClient(url, { useUnifiedTopology: true });

client.connect(function(err){

    assert.equal(null, err);
    console.log("Yep, it worked");

    const db = client.db(dbName);

    findDocuments(db, function(){
        client.close();
    });
});

const insertDocument = function(db, callback){

    const collection = db.collection("fruits");

    collection.insertMany([
        {
            name: "Apple",
            score: 6,
            review: "Great fruit"
        },
        {
            name: "Orange",
            score: 6,
            review: "kinda sour"
        },
        {
            name: "Banana",
            score: 9,
            review: "Great stuff"
        }
    ],
    function(err, result){
        // assert.equal(err, null);
        // assert.equal(3, result.result.n);
        // assert.equal(3, result.result.lenght);
        console.log("inserted 3 documents into the collection");
        callback(result);
    }
    );
};

const findDocuments = function(db, callback){

    const colllection = db.collection("fruits");

    colllection.find({}).toArray(function(err, fruits){

        assert.equal(err, null);
        console.log("Found the following records");
        console.log(fruits);
        callback(fruits);
    });
};