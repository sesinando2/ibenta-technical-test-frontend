const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const axios = require("axios");
const Querystring = require("query-string")

// var asyncRequire = require('async-require')

// asyncRequire('requestToken').then(function (token) {
//     // module has been exported and can be used here
//     token
//     // ...
// });
var tokens = require("./requestToken")

const { token } = require("morgan");

// dotenv
require("dotenv").config();

const app = express();

// Use our middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(morgan("common"));
app.use(express.json());

const data = {
    grant_type : process.env.GRANT_TYPE,
    client_id : process.env.CLIENT_ID,
    client_secret : process.env.CLIENT_SECRET,
    scope: process.env.SCOPE
}
const BASE_URL = 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users'
const TOKEN_URL = 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/oauth/token'

// Routes
app.get("/user", (req, res) => {
    res.send({
     message:" Example With Vues"
    });
  });

app.post("/adduser", (req,res) => {
    let route = 'adduser'
})

app.get("/oauth/tokens",(req,res) =>{
   
        console.log(tokens().access_token)
    

    const options = {
        'method': 'GET',
        'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users?access_token='+tokens,
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
    const ress = axios.request(options, function (error, response) { 
        if (error) throw new Error(error);
        // console.log(response.body);
    }).then(resp=>{
        console.log(resp.data)
        res.send({
            body: resp.data
        })
    }).catch((error) => {
        console.log('error ' + error);   
    });
});

//route api

//get all user action


//add user action
const addUser = (authtoken) => {
    const request = require('request');
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
        const options = {
            'method': 'POST',
            'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users?access_token='+authtoken,
            'headers': {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    "name":req.body.name,
                    "firstName":req.body.firstname,
                    "lastName":req.body.lastname,
                    "email":req.body.email,
                    "password":"tester"
                })
        }
        console.log("hash: ",hash)
        console.log("name :",req.body.name)
        request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
        })
    });
    console.log("password: ", req.body.password)
}

//request for token



// Provide a default port 
const port =  process.env.SERVER_PORT || 3000;

// Listen to server  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
