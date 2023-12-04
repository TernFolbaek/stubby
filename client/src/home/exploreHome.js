import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExploreHome = () => {
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    location: '',
    school: '',
    interests: [],
    likes: [],
    matches: [],
    description: '',
    userImage: '',
  });
  const [usersToExplore, setUsersToExplore] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeView, setActiveView] = useState('matches');

  useEffect(() => {
    fetchUserInfo();
    fetchUsersToExplore();
  }, []);

  const fetchUsersToExplore = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`/api/explore/users/${userId}`);
      const usersData = response.data.map((user) => {
        let imageDataUrl = '';

        if (
          user.userImage &&
          user.userImage.data &&
          user.userImage.contentType
        ) {
          // Convert the array buffer to a string
          const binary = String.fromCharCode.apply(
            null,
            user.userImage.data.data
          );
          const base64String = btoa(binary);
          imageDataUrl = `data:${user.userImage.contentType};base64,${base64String}`;
        }

        return { ...user, userImage: imageDataUrl };
      });
      setUsersToExplore(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchUserInfo = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.log('No user ID found');
      return;
    }

    try {
      const response = await axios.get(`/api/profile/${userId}`);
      const {
        username,
        email,
        location,
        age,
        school,
        interests,
        likes,
        matches,
        description,
        userImage,
      } = response.data;
      const imageDataUrl = userImage
        ? `data:${userImage.contentType};base64,${userImage.data}`
        : '';
      setUserInfo({
        username,
        email,
        location,
        age,
        school,
        interests,
        likes,
        matches,
        description,
        userImage: imageDataUrl,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
    console.log('image', userInfo.userImage);
  };

  const handleUserInteraction = async (liked, likedUserId) => {
    console.log(likedUserId);
    if (liked) {
      try {
        const userId = localStorage.getItem('userId');

        await axios.post(`/api/profile/like`, {
          userId: userId,
          likedUserId: likedUserId,
        });

        console.log(`Liked user with ID: ${likedUserId}`);
      } catch (error) {
        console.error('Error updating likes:', error);
      }
    }

    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className='explore-home-container'>
      <div className='explore-left'>
        <div className='matches-messages'>
          <div>
            <img
              src={userInfo.userImage}
              alt={userInfo.username}
              className='user-image'
            />
          </div>
          <button onClick={() => setActiveView('matches')}>Matches</button>
          <button onClick={() => setActiveView('messages')}>Messages</button>
        </div>
        <div className='explore'>
          {activeView === 'matches' && (
            <div>
              {/* Render matches here */}
              {userInfo.matches.map((match, index) => (
                <div key={index}>Match {index + 1}</div> // Replace with your match rendering logic
              ))}
            </div>
          )}
          {activeView === 'messages' && (
            <div>{/* Messages rendering logic will go here */}</div>
          )}
        </div>
      </div>
      <div className='explore-right'>
        {usersToExplore.length > 0 && currentIndex < usersToExplore.length ? (
          <div className='user-profile-card'>
            <img
              src={usersToExplore[currentIndex].userImage}
              alt={usersToExplore[currentIndex].username}
              className='profile-image'
            />
            <h3>{usersToExplore[currentIndex].username}</h3>
            <p>Location: {usersToExplore[currentIndex].location}</p>
            <p>Age: {usersToExplore[currentIndex].age}</p>
            <p>School: {usersToExplore[currentIndex].school}</p>
            <p>
              Interests: {usersToExplore[currentIndex].interests.join(', ')}
            </p>
            <button
              onClick={() =>
                handleUserInteraction(true, usersToExplore[currentIndex]._id)
              }
            >
              Yes
            </button>

            <button onClick={() => handleUserInteraction(false)}>No</button>
          </div>
        ) : (
          <div>No more users to explore</div>
        )}
      </div>
    </div>
  );
};

export default ExploreHome;
