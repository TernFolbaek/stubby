const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSignUp = async (req, res) => {
  try {
    let { username, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    user = new User({ username, email, password: hashedPassword });
    await user.save();



    const payload = { userId: user._id, hasProfile: user.hasProfile };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    console.log(token);
    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const userLogIn = async (req, res) => {
  console.log('in login')
  try {
    const { username, password } = req.body;
    console.log(`Logging in user: ${username}`);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '3h',
    });

    res.json({
      message: 'Logged in successfully',
      token,
      userId: user._id,
      hasProfile: user.hasProfile,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  userSignUp,
  userLogIn,
};
