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

//add user
app.post("/adduser", (req,res) => {
    (async function () {
        var accessToken = await tokens();
        // console.log("----",accessToken);

        const request = require('request');
        const bcrypt = require('bcrypt');
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, function (err,   hash) {
            const options = {
                'method': 'POST',
                'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users?access_token='+accessToken,
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
            console.log("hash: ",hash);
            console.log("name :",req.body.name);
            request(options, function (error, response) {
                if (error) throw new Error(error);
                    return response;
               
            })
            
        console.log("password: ", req.body.password)
        })
    })();
})

//update user
app.put("/updateuser", (req,res) => {
    (async function () {
        var accessToken = await tokens();
        const request = require('request');
        var options = {
            'method': 'PUT',
            'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users/'+req.body.id+'?access_token='+accessToken,
            'headers': {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(
                {
                    "name":req.body.name,
                    "firstName":req.body.firstname,
                    "lastName":req.body.lastname,
                    "email":req.body.email,
                    "password":"tester"
                })
          
          };
          request(options, function (error, response) {
            if (error) throw new Error(error);
                return response;
          });
    })();
})

app.delete("/deleteuser",(req,res) =>{
    (async function () {
        var accessToken = await tokens();
        console.log("req body-",req.body)
        const options = {
            'method': 'DELETE',
            'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users/'+req.body.id+'?access_token='+accessToken,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const ress = axios.request(options, function (error, response) { 
            // console.log(response.body);
        }).then(resp=>{
            res.send({
                body: resp.data
            })
        }).catch((error) => {
            console.log('error ' + error);   
        });
    })();
});

//get all user
app.get("/oauth/tokens",(req,res) =>{
    (async function () {
        var accessToken = await tokens();
    
        const options = {
            'method': 'GET',
            'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/api/users?access_token='+accessToken,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        const ress = axios.request(options, function (error, response) { 
            // console.log(response.body);
        }).then(resp=>{
            res.send({
                body: resp.data
            })
        }).catch((error) => {
            console.log('error ' + error);   
        });
    })();
});


// Provide a default port 
const port =  process.env.SERVER_PORT || 3000;

// Listen to server  
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
