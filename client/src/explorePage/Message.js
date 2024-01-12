import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WebSocketService from '../webSocketService';

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
    if (!WebSocketService.isConnected()) {
      WebSocketService.connect();
    }
    fetchMessages();

    const handleNewMessage = (message) => {
      console.log('New message received on client:', message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sortedIds = [currentUser, matchId].sort();
    const roomId = sortedIds.join("-");
  
    if (!WebSocketService.isConnected()) {
      WebSocketService.connect();
      WebSocketService.joinRoom(roomId); // Join the room after connecting
    } else {
      WebSocketService.joinRoom(roomId); // Join the room if already connected
    }
  
    fetchMessages();
    WebSocketService.onMessage(handleNewMessage);
  
    return () => {
      WebSocketService.offMessage(handleNewMessage);
      WebSocketService.disconnect();
    };
  }, [matchId, currentUser]);

 const handleSendMessage = async () => {
  if (!newMessage.trim()) return;
  
  const message = {
    fromUserId: currentUser,
    toUserId: matchId,
    message: newMessage,
    roomId: matchId, // or any other identifier for the chat room
  };
  
  setNewMessage('');
  
  try {
    await axios.post(`/api/messages/send`, message);
    WebSocketService.sendMessage(message);
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
