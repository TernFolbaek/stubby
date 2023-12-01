const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
  timestamp: { type: Date, default: Date.now },
  location: { type: String, required: false },
  age: { type: Number, required: false },
  school: { type: String, required: false },
  interests: [{ type: String }], 
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  description: { type: String, required: false, maxlength: 300 }, 
  hasProfile: { type: Boolean, default: false } ,
  userImage: { type: String, required: false },

});



const User = mongoose.model('User', UserSchema);

module.exports = User;
