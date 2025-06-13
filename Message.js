// models/Message.js
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  collection: 'messages' // ✅ explicitly sets the collection name
});

module.exports = mongoose.model('Message', messageSchema);
