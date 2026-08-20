const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');
const Opportunity = require('./models/Opportunities');


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
            res.json("Success");
          } else {
            res.json("The password is incorrect");
          }
        } else {
          res.json("No record existed");
        }
      })
      .catch(err => res.status(500).json({ message: err.message }));
});

app.get('/api/opportunities', async (req, res) => {
  try {
    const opportunities = await Opportunity.find().sort({ createdAt: -1 });
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.post('/api/opportunities', async (req,res) => {
  try{
    const newOpportunity = await Opportunity.create(req.body);
    res.status(201).json(newOpportunity);
  }catch(err){
    res.status(500).json({ message: err.message });
  }

})


// UPDATE Endpoint
app.put('/api/opportunities/:id', async (req, res) => {
  try {
    const updatedOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Returns updated document
    );
    res.json(updatedOpportunity);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE Endpoint
app.delete('/api/opportunities/:id', async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: "Opportunity deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(3001, () => {
    console.log("backend running");
})