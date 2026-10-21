require('dotenv').config({path: './.env'});
const googleAuthRoutes = require('./routes/googleAuth');

const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { OAuth2Client } = require('google-auth-library'); // 1. Import OAuth2Client
const UserModel = require('./models/Users');
const Opportunity = require('./models/Opportunities');
const jwt = require('jsonwebtoken');

const Mongo_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;
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
    // 1.Verify Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: 'Invalid Google token' });
    }

    const {
        email,
        given_name,
        family_name,
        sub: googleId,
        email_verified
    } = payload;

    if (!email || email_verified !== true) {
      return res.status(403).json({
        message: 'A verified Google email is required',
      });
    }

    let user = await UserModel.findOne({ googleId });

    if (!user) {

        user = await UserModel.findOne({email});

        if(!user){
          user = await UserModel.create({
            firstName: given_name || 'Google',
            lastName: family_name || 'User',
            email,
            googleId,
            authProvider: 'google',
            emailVerified: email_verified === true
          });
        }
        else{
          if (user.googleId && user.googleId !== googleId) {
            return res.status(409).json({
              message: 'This account is linked to another Google account',
            });
          }
          user.emailVerified = true;
          user.googleId = googleId;
          await user.save();

        }
    
      }
    // 3. Generate standard JWT for your app
    const appToken = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ success: true, token: appToken });

  } catch (err) {
     console.error('Google Auth Error:', err);

    // Handle duplicate-key conflicts, such as simultaneous account creation
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'An account with these details already exists. Please try again.',
      });
    }

    return res.status(401).json({
      message: 'Google sign-in failed',
    });
  }
});

// Standard Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const {firstName, lastName, email, password} = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: 'All fields are required',
      });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: 'An account with this email already exists',
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const verificationToken = crypto
      .randomBytes(32)
      .toString('hex');

    const hashedToken = crypto
      .createHash('sha256')
      .update(verificationToken)
      .digest('hex');

    const verificationExpires =
      Date.now() + 15 * 60 * 1000;

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      emailVerificationToken: hashedToken,
      emailVerificationExpires: verificationExpires,
    });

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
    });

  } catch (err) {
    console.error('Registration Error:', err);

    if (err.code === 11000) {
      return res.status(409).json({
        message: 'An account with these details already exists',
      });
    }

    return res.status(500).json({
      message: 'Registration failed',
    });
  }
});
// Standard Login
// Standard Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No record existed',
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'The password is incorrect',
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.json({ success: true, token });

  } catch (error) {
    console.error(
      'Google Auth Error:',
      error.response?.status,
      error.response?.data || error.message
    );

    setErrorMessage(
      error.response?.data?.message ||
      'Google authentication failed. Please try again.'
    );
  }
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