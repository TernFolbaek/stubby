import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Match from './Match';
import { mdiHeartCircleOutline, mdiAlphaXCircleOutline } from '@mdi/js';
import Icon from '@mdi/react';

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
    firstName: '',
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

      const firstName = response.data.firstName?.replace(/"/g, '') || '';

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
        firstName,
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
          <div className='current-user'>
            <img
              src={userInfo.userImage}
              alt={userInfo.username}
              className='user-image'
            />
            <h4 className='bg-none'>{userInfo.firstName}</h4>
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

        {activeView === 'matches' && (
          <div className='explore'>
            {userInfo.matches.map((matchId, index) => (
              <Match key={index} matchId={matchId} />
            ))}
          </div>
        )}
        {activeView === 'messages' && <div></div>}
      </div>

      <div className='explore-right'>
        <div className='study-mate-card-container'>
          {usersToExplore.length > 0 && currentIndex < usersToExplore.length ? (
            <div className='user-profile-card'>
              <div className='user-card-left'>
                <div className='user-info'>
                  <img
                    src={usersToExplore[currentIndex].userImage}
                    alt={usersToExplore[currentIndex].username}
                    className='profile-image'
                  />
                </div>
                <h2>
                  {usersToExplore[currentIndex].username},{' '}
                  {usersToExplore[currentIndex].age}{' '}
                </h2>
                <h3>{usersToExplore[currentIndex].location}</h3>
                <h3>{usersToExplore[currentIndex].institution}</h3>
              </div>
              <div className='user-card-right'>
                <h2 className='user-card-title'>
                  About {usersToExplore[currentIndex].username}
                </h2>
                <div className='user-details'></div>
                <div className='user-description'>
                  <p>{usersToExplore[currentIndex].description}</p>
                </div>

                <h3 className='user-card-title'>Subjects of interest:</h3>
                <div className='interest-card-container'>
                  {usersToExplore[currentIndex].interests.map(
                    (interest, index) => (
                      <li className='user-interests' key={index}>
                        {interest}
                      </li>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>No more users to explore</div>
          )}
        </div>
        <div className='interaction-buttons'>
          <Icon
            onClick={() =>
              handleUserInteraction(true, usersToExplore[currentIndex]._id)
            }
            path={mdiHeartCircleOutline}
            title='checkmark'
            size={3}
            horizontal
            vertical
            rotate={180}
            className='yes'
          />
          <Icon
            onClick={() => handleUserInteraction(false)}
            path={mdiAlphaXCircleOutline}
            title='checkmark'
            size={3}
            horizontal
            vertical
            rotate={180}
            className='no'
          />

        </div>
      </div>
    </div>
  );
};

export default ExploreHome;
