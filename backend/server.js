require('dotenv').config({path: './.env'});
const googleAuthRoutes = require('./routes/googleAuth');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library'); // 1. Import OAuth2Client
const UserModel = require('./models/Users');
const Opportunity = require('./models/Opportunities');
const jwt = require('jsonwebtoken');

const Mongo_URI = process.env.MONGO_URI;

const JWT_SECRET = process.env.JWT_SECRET;
//  Client ID from Google Cloud Console
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID; 

const googleClient = new OAuth2Client(GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/auth', googleAuthRoutes);

mongoose.connect(Mongo_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

// Google OAuth Endpoint
app.post('/api/auth/google', async (req, res) => {
  const { token } = req.body;

  try {
    // 1. Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, given_name, family_name, sub: googleId } = payload;

    // 2. Find existing user or create a new one
    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        firstName: given_name || 'Google',
        lastName: family_name || 'User',
        email: email,
        googleId: googleId,
      });
    }

    // 3. Generate standard JWT for your app
    const appToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ success: true, token: appToken });
  } catch (err) {
    console.error('Google Auth Verification Error:', err);
    res.status(400).json({ message: 'Invalid or expired Google token' });
  }
});

// Standard Register
app.post('/api/auth/register', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json({ success: true, user }))
    .catch(err => res.status(500).json({ message: err.message }));
});

// Standard Login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    UserModel.findOne({ email: email })
      .then(user => {
        if (user) {
          if (user.password === password) {
              const token = jwt.sign(
                  { userId: user._id },
                  JWT_SECRET,
                  { expiresIn: '1d' }
              );

              res.json({ success: true, token });
          } else {
            res.status(400).json({ success: false, message: "The password is incorrect" });
          }
        } else {
          res.status(404).json({ success: false, message: "No record existed" });
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
});

// JWT Middleware
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

// GET Opportunities
app.get('/api/opportunities', authenticate, async (req, res) => {
  try {
    const opportunities = await Opportunity.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE Opportunity
app.post('/api/opportunities', authenticate, async (req, res) => {
  try {
    const newOpportunity = await Opportunity.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(newOpportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE Opportunity
app.put('/api/opportunities/:id', authenticate, async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body, // Fixed: passes incoming body updates
      { new: true, runValidators: true }
    );
    res.json(updatedOpportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Opportunity
app.delete('/api/opportunities/:id', authenticate, async (req, res) => {
  try {
    const deletedOpportunity = await Opportunity.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });
    if (!deletedOpportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }
    res.json({ message: "Opportunity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
    console.log("backend running on port 3001");
});