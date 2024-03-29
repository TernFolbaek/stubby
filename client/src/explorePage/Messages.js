import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Messages = ({onSelectMessage}) => {
  const [messagePreviews, setMessagePreviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  useEffect(() => {
    const fetchMessagePreviews = async () => {
      try {
        setIsLoading(true); 
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`/api/messages/preview/${userId}`);
        console.log(response.data);
        setMessagePreviews(response.data);
      } catch (error) {
        console.error('Error fetching message previews:', error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchMessagePreviews();
  }, []);

  const renderMessagePreview = (message) => {
    const words = message.split(' ');
    const preview = words.slice(0, 10).join(' ');
    return preview + (words.length > 10 ? '...' : '');
  };

  // Conditionally render the loading gif or the message previews
  return (
    <div className='bg-inherit'>
      {isLoading ? (
        <div className='loading-ring'></div>
      ) : (
        messagePreviews.map(({ matchId, matchName, matchProfilePic, lastMessage }, index) => (
          <div className='message-container-hr' key={index} onClick={() => onSelectMessage(matchId)}>
            <div className='message'>
              <img src={matchProfilePic} alt={matchName} className='message-image' />
              <div className='message-text'>
                <h4 className='match-name'>{matchName}</h4>
                <p className='match-description'>{renderMessagePreview(lastMessage)}</p>
              </div>
            </div>
            <hr className='message-hr' />
          </div>
        ))
      )}
    </div>
  );
};

export default Messages;
