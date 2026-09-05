const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const Opportunity = require('./models/Opportunities');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'opportunity-os-secret';

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect("mongodb://127.0.0.1:27017/register")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

app.post('/api/auth/register', (req, res) => {
  UserModel.create(req.body)
    .then(user => res.json({ success: true, user }))
    .catch(err => res.status(500).json({ message: err.message }));
});

// Login endpoint
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
            res.json("The password is incorrect");
          }
        } else {
          res.json("No record existed");
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
});

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

app.get('/api/opportunities', authenticate, async (req, res) => {
  try {
    const opportunities = await Opportunity.find({userId: req.userId}).sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/opportunities', authenticate, async (req,res) => {
  try{
    const newOpportunity = await Opportunity.create({
      ...req.body,
      userId: req.userId
    });
    res.status(201).json(newOpportunity);
  }catch(err){
    res.status(500).json({ message: err.message });
  }

})

// UPDATE Endpoint
app.put('/api/opportunities/:id', authenticate, async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findOneAndUpdate(
      {_id : req.params.id, userId: req.userId,},
      {
        title,
        company,
        opportunityStatus,
        dateApplied,
        deadlineDate
      },
      { new: true, runValidators: true } // Returns updated document
    );
    res.json(updatedOpportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Endpoint
app.delete('/api/opportunities/:id', authenticate, async (req, res) => {
  try {
    const deletedOpportunity = await Opportunity.findOneAndDelete({
      _id : req.params.id,
      userId : req.userId
    });
    if (!deletedOpportunity) {
      return res.status(404).json({
        message: 'Opportunity not found'
      });
    }
    res.json({ message: "Opportunity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
    console.log("backend running");
})