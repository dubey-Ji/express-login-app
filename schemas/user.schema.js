const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  }
}).set('timestamps', true);

const User = mongoose.Model('User', schema);

module.exports = { User };