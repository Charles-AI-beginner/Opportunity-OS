const express = require('express');
const router = express.Router();
const {google} =  require('googleapis');

const oauthClient = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    clientAuthentication: 'none'
});

router.get('/google',(req,res)=>{
    const authUrl = oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly'
        ],
    });
    res.redirect(authUrl)
});

router.get('/google/callback',async (req,res)=>{

    const {code} = req.query;
    if(!code){
        return res.status(400).json({
            message: 'Authorization code missing'
        });
    }

    try{
        const {tokens} = await oauthClient.getToken(code);
        console.log("Google tokens recieved");
        console.log(tokens);

        res.json("Google OAuth Successful");
    }
    catch(error){
        console.error('OAuth error: ', error);
        res.status(500).json({
            message: 'Google OAuth Failed'
        });
    }
});
module.exports = router;