const Message = require('../models/message');
const User = require('../models/user');
const mongoose = require('mongoose');

const postMessage = async (req, res) => {
  try {
    const { fromUserId, toUserId, message } = req.body;

    const newMessage = new Message({
      fromUserId,
      toUserId,
      message,
    });

    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error posting message:', error);
    res
      .status(500)
      .json({ message: 'Error sending message', error: error.message });
  }
};

const fetchMessages = async (req, res) => {
  console.log('controller message checkpoint');

  try {

    const { userId1, userId2 } = req.params;
    console.log(req.params);

    const isValid1 = mongoose.isValidObjectId(userId1);
    const isValid2 = mongoose.isValidObjectId(userId2);
    console.log('3');

    if (!isValid1 || !isValid2) {
      return res.status(400).json({ message: 'Invalid user ID(s)' });
    }
    console.log('4');

    const messages = await Message.find({
      $or: [
        { fromUserId: userId1, toUserId: userId2 },
        { fromUserId: userId2, toUserId: userId1 },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res
      .status(500)
      .json({ message: 'Error fetching messages', error: error.message });
  }
};

const getMessagePreviews = async (req, res) => {
  try {
    const currentUserId = req.params.userId;
    // Fetch all messages where the current user is involved
    const messages = await Message.find({
      $or: [{ fromUserId: currentUserId }, { toUserId: currentUserId }],
    }).populate('fromUserId toUserId');

    // Identify unique matches
    let matches = new Set();
    messages.forEach((message) => {
      let otherUserId = message.fromUserId._id.equals(currentUserId)
        ? message.toUserId._id
        : message.fromUserId._id;
      matches.add(otherUserId.toString());
    });

    let messagePreviews = [];

    for (let matchId of matches) {
      // Fetch match details
      const matchUser = await User.findById(matchId);
      if (matchUser) {
        // Find the latest message with this match
        const latestMessage = messages
          .filter(
            (m) =>
              m.fromUserId._id.equals(matchId) || m.toUserId._id.equals(matchId)
          )
          .sort((a, b) => b.timestamp - a.timestamp)[0];

        messagePreviews.push({
          matchId: matchId,
          matchName: matchUser.username,
          matchProfilePic: matchUser.userImage
            ? `data:${
                matchUser.userImage.contentType
              };base64,${matchUser.userImage.data.toString('base64')}`
            : null,
          lastMessage: latestMessage.message,
        });
      }
    }

    res.status(200).json(messagePreviews);
  } catch (error) {
    console.error('Error getting message previews:', error);
    res.status(500).json({
      message: 'Error fetching message previews',
      error: error.message,
    });
  }
};

module.exports = { postMessage, fetchMessages, getMessagePreviews };
