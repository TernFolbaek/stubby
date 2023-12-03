import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExploreHome = () => {
  const [userInfo, setUserInfo] = useState({ imageUrl: '', name: '' });

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('No user ID found');
      return;
    }

    try {
      const response = await axios.get(`/api/user/${userId}`); 
      const { name, imageUrl } = response.data; 
      setUserInfo({ name, imageUrl });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div className='explore-home-container'>
      <div className='matches-messages'>
        <div>
            <img src={userInfo.imageUrl} alt={userInfo.name} />
          <h2>matches</h2>
          <h2>messages</h2>
        </div>
      </div>
      <div className='explore'></div>
    </div>
  );
};

export default ExploreHome;
