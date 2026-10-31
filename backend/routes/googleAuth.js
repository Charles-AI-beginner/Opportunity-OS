const express = require('express');
const router = express.Router();
const { google } = require('googleapis');
const crypto = require('crypto');

const authenticate = require('../middleware/auth');
const User = require('../models/Users');

const oauthClient = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUri: process.env.GOOGLE_REDIRECT_URI,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
});

// temporarily store OAuth state values.
// for production, use a shared store with expiry 
// such as Redis.
const oauthStates = new Map();

router.get('/google/url', authenticate, (req, res) => {
    const state = crypto.randomBytes(32).toString('hex');

    oauthStates.set(state, {
        userId: req.userId,
        createdAt: Date.now()
    });

    const authUrl = oauthClient.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',
        scope: [
            'https://www.googleapis.com/auth/gmail.readonly'
        ],
        state
    });

    res.json({ authUrl });
});

// Keep this route only if you need it for another flow.
// The frontend should use /google/url to obtain the authorization URL.
router.get('/google', (req, res) => {
    res.status(400).json({
        message: 'Request the Gmail authorization URL through /google/url'
    });
});


router.get('/google/callback', async (req, res) => {
    const { code, state, error } = req.query;

    if (error) {
        return res.status(400).json({
            message: 'Gmail authorization was cancelled or denied'
        });
    }

    if (!code || !state) {
        return res.status(400).json({
            message: 'Authorization code or state missing'
        });
    }

    const savedState = oauthStates.get(state);
    oauthStates.delete(state);

    if (
        !savedState ||
        Date.now() - savedState.createdAt > 10 * 60 * 1000
    ) {
        return res.status(400).json({
            message: 'Invalid or expired OAuth state'
        });
    }

    try {
        const { tokens } = await oauthClient.getToken(code);
        console.log('Google token exchange succeeded');
        console.log('Access token received:', !!tokens.access_token);
        console.log('Refresh token received:', !!tokens.refresh_token);
        const tokenData = {
            accessToken: tokens.access_token,
            expiryDate: tokens.expiry_date
        };

        // Google may not return a refresh token every time.
        if (tokens.refresh_token) {
            tokenData.refreshToken = tokens.refresh_token;
        }


        
        const updatedUser = await User.findByIdAndUpdate(
            savedState.userId,
            {
                $set: Object.fromEntries(
                    Object.entries(tokenData).map(
                        ([key, value]) => [`gmailTokens.${key}`, value]
                    )
                )
            },
            { new: true, runValidators: true }
        );

        console.log('User found and updated:', !!updatedUser);
        console.log('User ID used:', savedState.userId);
        console.log('Gmail tokens field:', updatedUser?.gmailTokens);
        console.log('Gmail access token exists:', !!updatedUser?.gmailTokens?.accessToken);

        res.redirect('http://localhost:5173/dashboard?gmail=connected');
    } 
    catch (error) {
        console.error('OAuth error:', error.message);

        res.status(500).json({
            message: 'Google OAuth Failed'
        });
    }
});

module.exports = router;