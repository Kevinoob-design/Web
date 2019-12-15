const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

var listener = app.listen(process.env.PORT || 3000, function(){
    console.log("Runnig " + listener.address().port);
})

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/", function(req, res){

    var name = req.body.name;
    var lastName = req.body.lastName;
    var email = req.body.email;

    data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                data:{
                    FNAME: name,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/bd6a68c56f",
        method: "POST",
        headers:{
            "Authorization": "Hector 547a270531de10e17cb0f3bb6d51bada-us4"
        },
        body: jsonData
    }

    console.log(req.ip);
    console.log("-----------------------------------------------------------------------------");

    request(options, function(err, response, body){
        if(err){
            console.log(err);
            res.sendFile(__dirname+"/failure.html")
        }
        else if(response.statusCode === 200){
            console.log(response.statusCode);
            res.sendFile(__dirname+"/success.html")
        }
        else{
            console.log(err);
            res.sendFile(__dirname+"/failure.html")
        }
    })

    console.log(res);
})

// 547a270531de10e17cb0f3bb6d51bada-us4
// bd6a68c56f