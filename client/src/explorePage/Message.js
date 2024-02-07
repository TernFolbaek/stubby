import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import Icon from '@mdi/react';
import { mdiDotsVertical, mdiSendVariantOutline } from '@mdi/js';

const socket = io('http://localhost:3001');

const Message = ({ matchId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = localStorage.getItem('userId');
  const messageListRef = useRef(null);
  const [matchInfo, setMatchInfo] = useState({
    username: '',
    userImage: '',
    isActive: false,
  });
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Formats the time e.g., '14:00'
  };

  useEffect(() => {
    const fetchMessages = async () => {
      console.log('fetch messages entry');
      console.log('match id', matchId);
      console.log('current user', currentUser);

      try {
        const response = await axios.get(
          `/api/messages/retrieve/${matchId}/${currentUser}`
        );
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/profile/${matchId}`);
        const { username, userImage } = response.data;

        const imageDataUrl = userImage
          ? `data:${userImage.contentType};base64,${userImage.data}`
          : '';

        setMatchInfo({ username, userImage: imageDataUrl });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchMessages();
    fetchUser();
    socket.emit('register', { userId: currentUser, conversingWith: [matchId] });

    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on('allUsersStatus', (allStatuses) => {
      if (allStatuses[matchId] !== undefined) {
        setMatchInfo((prevInfo) => ({
          ...prevInfo,
          isActive: allStatuses[matchId],
        }));
      }
    });

    socket.on('userStatusUpdate', (statusUpdate) => {
      if (statusUpdate.userId === matchId) {
        setMatchInfo((prevInfo) => ({
          ...prevInfo,
          isActive: statusUpdate.isActive,
        }));
      }
    });

    return () => {
      socket.off('receiveMessage');
      socket.off('userStatusUpdate');
      socket.off('allUsersStatus');
    };
  }, [currentUser, matchId]);

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
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className='message-container'>
      <div className='message-subcontainer'>
        <div className='match-info'>
          <div className='user-image-message-container'>
            <img
              src={matchInfo.userImage}
              alt={matchInfo.username}
              className='user-image-message'
            />
            {matchInfo.isActive ? (
              <div className='status-dot active'></div>
            ) : (
              <div className='status-dot inactive'></div>
            )}
          </div>
          <div className='user-details'>
            <h2>{matchInfo.username}</h2>
            {matchInfo.isActive ? (
              <h5 className='active-status'>online</h5>
            ) : (
              <h5 className='inactive-status'>offline</h5>
            )}
          </div>
          <Icon className='dots-vertical' path={mdiDotsVertical} size={1} />
        </div>

        <div className='message-list' ref={messageListRef}>
          {messages.map((msg, index) => {
            const isLastMessageByUser =
              index === messages.length - 1 ||
              messages[index + 1].fromUserId !== msg.fromUserId;

            return (
              <div key={index} className='message-and-timestamp'>
                <div
                  className={
                    msg.fromUserId === currentUser
                      ? 'message-sent'
                      : 'message-received'
                  }
                >
                  {msg.message}
                </div>
                {isLastMessageByUser && (
                  <div
                    className={`timestamp ${
                      msg.fromUserId === currentUser
                        ? 'timestamp-right'
                        : 'timestamp-left'
                    }`}
                  >
                    {formatTimestamp(msg.timestamp)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className='message-input'>
          <div className='message-send'>
            <input
              type='text'
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder='Write Message'
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
            <Icon
              onClick={handleSendMessage}
              className='send-button'
              path={mdiSendVariantOutline}
              size={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
