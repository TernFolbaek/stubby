// index.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')

require('dotenv').config();
const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors())
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);

const bcrypt = require('bcryptjs');

async function testBcrypt() {
  try {
    const password = 'testPassword123'; // Replace with your test password
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing the password

    console.log('Hashed Password:', hashedPassword);

    const isMatch = await bcrypt.compare(password, hashedPassword); // Comparing the password
    console.log('Password Match:', isMatch);
  } catch (error) {
    console.error('Error:', error);
  }
}

testBcrypt();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
