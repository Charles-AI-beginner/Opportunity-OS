const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, unique: true, sparse: true},
  password: { type: String, required: false },
  emailVerified: {
    type: Boolean,
    default: false
  },
  gmailTokens: {
    accessToken: { type: String },
    refreshToken: { type: String },
    expiryDate: { type: Number }
  },
  emailVerificationToken: {type: String, required: true},

  emailVerificationExpires: {type: Date, required: false},

  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  }
});

module.exports = mongoose.model('Users', UserSchema);