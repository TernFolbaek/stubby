const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const socketIo = require('socket.io');
const http = require('http');

// Create Express app
const app = express();
app.use(express.json());
app.use('/pfp', express.static('pfp'));

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

const ACTIVE_CHECK_INTERVAL = 20000; // 20 seconds

// Update and broadcast user status periodically
setInterval(() => {
  io.emit('allUsersStatus', userStatus);
}, ACTIVE_CHECK_INTERVAL);


const userStatus = {};

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.emit('allUsersStatus', userStatus);

  // Register user as online
  socket.on('register', ({ userId }) => {
    userStatus[userId] = true;
    socket.userId = userId;
    // Emit user status to other users
    socket.broadcast.emit('userStatusUpdate', { userId, isActive: true });
  });

  socket.on('sendMessage', (message) => {
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    if (socket.userId) {
      userStatus[socket.userId] = false;
      io.emit('userStatusUpdate', { userId: socket.userId, isActive: false });
    }
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
const devRoutes = require('./routes/devRoutes');

app.use('/api/users', userRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/explore', explorationRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/dev', devRoutes);



const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));