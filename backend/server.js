const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const UserModel = require('./models/Users');

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

app.listen(3001, () => {
    console.log("backend running");
})