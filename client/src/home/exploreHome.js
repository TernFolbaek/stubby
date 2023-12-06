import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Match from './Match';

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
      const usersData = await Promise.all(
        response.data.map(async (user) => {
          let imageDataUrl = '';
          if (
            user.userImage &&
            user.userImage.data &&
            user.userImage.contentType
          ) {
            const blob = new Blob([new Uint8Array(user.userImage.data.data)], {
              type: user.userImage.contentType,
            });
            imageDataUrl = await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            });
          }

          let interestsArray = [];
          if (Array.isArray(user.interests) && user.interests.length > 0) {
            try {
              interestsArray = JSON.parse(user.interests[0]);
            } catch (e) {
              console.error('Error parsing interests:', e);
              interestsArray = [];
            }
          } else if (typeof user.interests === 'string') {
            try {
              // Directly parse the string as JSON
              interestsArray = JSON.parse(user.interests);
            } catch (e) {
              console.error('Error parsing interests:', e);
              interestsArray = [];
            }
          }

          const institution = user.institution?.replace(/"/g, '') || '';
          const location = user.location?.replace(/"/g, '') || '';
          const description = user.description?.replace(/"/g, '') || '';

          return {
            ...user,
            userImage: imageDataUrl,
            interests: interestsArray,
            institution,
            location,
            description,
          };
        })
      );
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

  const setActiveViewWithStyle = (view) => {
    setActiveView(view);
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
          <button
            className={activeView === 'matches' ? 'active' : ''}
            onClick={() => setActiveViewWithStyle('matches')}
          >
            Matches
          </button>
          <button
            className={activeView === 'messages' ? 'active' : ''}
            onClick={() => setActiveViewWithStyle('messages')}
          >
            Messages
          </button>
        </div>
        <hr />
        <div className='explore'>
          {activeView === 'matches' && (
            <div>
              {userInfo.matches.map((matchId) => (
                <Match key={matchId} matchId={matchId} />
              ))}
            </div>
          )}
          {activeView === 'messages' && <div></div>}
        </div>
      </div>
      <div className='explore-right'>
        {usersToExplore.length > 0 && currentIndex < usersToExplore.length ? (
          <div className='user-profile-card'>
            <div className='user-card-left'>
              <div className='user-info'>
                <img
                  src={usersToExplore[currentIndex].userImage}
                  alt={usersToExplore[currentIndex].username}
                  className='profile-image'
                />
                <div className='user-details'>
                  <h3>{usersToExplore[currentIndex].username}</h3>
                  <h3>School: {usersToExplore[currentIndex].institution}</h3>
                  <p>Location: {usersToExplore[currentIndex].location}</p>
                  <p>Age: {usersToExplore[currentIndex].age}</p>
                  <div>
                    {usersToExplore[currentIndex].interests.map(
                      (interest, index) => (
                        <h3 key={index}>{interest}</h3>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='user-card-right'>
              <div className='user-description'>
                <h3>Description</h3>
                <p>{usersToExplore[currentIndex].description}</p>
              </div>
              <div className='interaction-buttons'>
                <button
                  onClick={() =>
                    handleUserInteraction(
                      true,
                      usersToExplore[currentIndex]._id
                    )
                  }
                >
                  Yes
                </button>
                <button onClick={() => handleUserInteraction(false)}>No</button>
              </div>
            </div>
          </div>
        ) : (
          <div>No more users to explore</div>
        )}
      </div>
    </div>
  );
};

export default ExploreHome;
