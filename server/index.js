const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const socketIo = require('socket.io');
const http = require('http');

// Create Express app
const app = express();
app.use(express.json());

// Configure CORS
const corsOptions = {
  origin: 'http://localhost:3000', // Client URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};
app.use(cors(corsOptions));

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// MongoDB connection
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const explorationRoutes = require('./routes/explorationRoutes');
const messageRoutes = require('./routes/messageRoutes');
app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/explore', explorationRoutes);
app.use('/api/messages', messageRoutes);

// Create a server instance using http

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
