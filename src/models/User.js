const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  vatsimCID: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  keyCreatedAt: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
