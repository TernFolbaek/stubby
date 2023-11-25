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
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] 
});



UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
