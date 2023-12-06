// index.js or app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes')
const explorationRoutes = require('./routes/explorationRoutes')

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
app.use('/api/explore', explorationRoutes);



const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
