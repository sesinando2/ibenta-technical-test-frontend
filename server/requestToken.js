const axios = require("axios");

const getToken = async() => {
    const options = {
        'method': 'POST',
        'url': 'http://authentication-service.jx-ibenta-authentication-service-pr-15.ibenta.com/oauth/token?client_id=AITWD1zyBVuPWgn4ZBHSREtXJDZXL9Lt&client_secret=ELEGpyarKD0OWDrzfiqWqmpkOb4FSKnb&grant_type=client_credentials',
        'headers':  {
            'accept': 'application/json'
        }
    };
    await axios.request(options, function (error, response) { 
    }).then(resp=>{
        // resp.data.access_token
        //  console.log("requestToken.js-",resp.data.access_token)
         return resp.data.access_token
    }).catch((error) => {
        console.log('error ' + error);   
    });
};

module.exports.getToken = getToken;
