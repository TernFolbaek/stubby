const User = require('../models/user');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const createUsers = async (req, res) => {
  try {
    const hashedPassword1 = await bcrypt.hash(
      process.env.DEVUSER1_PASSWORD,
      10
    );
    const hashedPassword2 = await bcrypt.hash(
      process.env.DEVUSER2_PASSWORD,
      10
    );
    const hashedPassword3 = await bcrypt.hash(
      process.env.DEVUSER3_PASSWORD,
      10
    );

    const users = [
      {
        userImage: '/pfp/dog.jpg',
        username: 'DevUser1',
        email: 'devuser1@example.com',
        password: hashedPassword1,
        firstName: 'Dev',
        lastName: 'User1',
        gender: 'Not Specified',
        position: 'Developer',
        location: 'City A',
        age: 30,
        institution: 'Institution A',
        interests: '["coding", "tech"]',
        description: 'Description for DevUser1',
        hasProfile: true,
        matches: [],
        likes: [],
      },
      {
        userImage: '/pfp/dog.jpg',
        username: 'DevUser2',
        email: 'devuser2@example.com',
        password: hashedPassword2,
        firstName: 'Dev',
        lastName: 'User2',
        gender: 'Not Specified',
        position: 'Tester',
        location: 'City B',
        age: 28,
        institution: 'Institution B',
        interests: '["testing", "quality assurance"]',
        description: 'Description for DevUser2',
        hasProfile: true,
        matches: [],
        likes: [],
      },
      {
        userImage: '/pfp/dog.jpg',
        username: 'DevUser3',
        email: 'devuser3@example.com',
        password: hashedPassword3,
        firstName: 'Dev',
        lastName: 'User3',
        gender: 'Not Specified',
        position: 'Manager',
        location: 'City C',
        age: 35,
        institution: 'Institution C',
        interests: '["management", "leadership"]',
        description: 'Description for DevUser3',
        hasProfile: true,
        matches: [],
        likes: [],
      },
    ];

    for (const user of users) {
      const newUser = new User(user);
      await newUser.save();
    }

    res.status(200).json({ message: 'Users created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany({
      username: { $in: ['DevUser1', 'DevUser2', 'DevUser3'] },
    });

    res.status(200).json({ message: 'Users deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUsers, deleteUsers };
