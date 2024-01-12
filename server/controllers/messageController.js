const Message = require('../models/message');

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

  try {
    const { userId1, userId2 } = req.params;

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

module.exports = { postMessage, fetchMessages };
