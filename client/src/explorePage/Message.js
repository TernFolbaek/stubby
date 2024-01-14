import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
const socket = io('http://localhost:3001');

const Message = ({ matchId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = localStorage.getItem('userId');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `/api/messages/retrieve/${matchId}/${currentUser}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('receiveMessage');
    };

  }, [matchId, currentUser]);

 
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const message = {
      fromUserId: currentUser,
      toUserId: matchId,
      message: newMessage,
    };

    setNewMessage('');

    try {
      await axios.post(`/api/messages/send`, message);
      socket.emit('sendMessage', message);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className='message-container'>
      <div className='message-list'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.fromUserId === currentUser
                ? 'message-sent'
                : 'message-received'
            }
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className='message-input'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder='Type a message...'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Message;
