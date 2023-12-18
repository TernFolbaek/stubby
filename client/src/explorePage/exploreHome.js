import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Match from '../home/Match';
import { mdiCardsHeartOutline, mdiChevronRight } from '@mdi/js';
import Icon from '@mdi/react';
import ExploreNavbar from './ExploreNavbar';

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
    email: '',
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
      const lastName = response.data.lastName?.replace(/"/g, '') || '';

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
        lastName,
      });
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
    console.log('image', userInfo.userImage);
  };

  const handleUserInteraction = async (liked, likedUserId) => {
    const cardElement = document.querySelector('.user-profile-card');
    if (cardElement) {
      cardElement.classList.add('fade-out-animation');

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
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        cardElement.classList.remove('fade-out-animation');
      }, 500);
    }
  };

  const setActiveViewWithStyle = (view) => {
    setActiveView(view);
  };

  return (
    <div className='explore-home-container'>
      <div className='explore-left'>
        <div className='current-user'>
          <img
            src={userInfo.userImage}
            alt={userInfo.username}
            className='user-image'
          />
          <div className='current-user-info'>
            <h4>
              {userInfo.firstName} {userInfo.lastName}
            </h4>
            <h4 className='current-email'>{userInfo.email} </h4>
          </div>
        </div>
        <hr className='explore-hr' />

        <div className='matches-messages-container relative bg-black rounded-full overflow-hidden cursor-pointer'>
          <div
            className={`slider-indicator rounded-full transition-all duration-300 ease-in-out`}
            style={{
              transform: `translateX(${
                activeView === 'matches' ? '0' : '100%'
              })`,
            }}
          ></div>

          {/* Buttons */}
          <button
            onClick={() => setActiveViewWithStyle('matches')}
            className={`toggle-button absolute w-1/2 top-0.5 ${
              activeView === 'matches' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Matches
          </button>
          <button
            onClick={() => setActiveViewWithStyle('messages')}
            className={`toggle-button absolute w-1/2 top-0.5 right-0 ${
              activeView === 'messages' ? 'text-white' : 'text-gray-400'
            }`}
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
        <ExploreNavbar />

        {usersToExplore.length > 0 && currentIndex < usersToExplore.length ? (
          <div className='card-wrapper'>
            <div className='user-profile-card'>
              <div className='user-card-top'>
                <div className='user-info'>
                  <img
                    src={usersToExplore[currentIndex].userImage}
                    alt={usersToExplore[currentIndex].username}
                    className='profile-image'
                  />
                </div>
                <div className='user-information'>
                  <h2 className='font-semibold'>
                    {usersToExplore[currentIndex].username}{' '}
                  </h2>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Age:</span>{' '}
                    {usersToExplore[currentIndex].age}{' '}
                  </h3>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Location:</span>{' '}
                    {usersToExplore[currentIndex].location}
                  </h3>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Establishment:</span>{' '}
                    {usersToExplore[currentIndex].institution}
                  </h3>
                </div>
              </div>
              <div className='user-card-bottom'>
                <h3 className='user-card-title pb-2'>Subjects:</h3>
                <div className='interest-card-container'>
                  {usersToExplore[currentIndex].interests.map(
                    (interest, index) => (
                      <div className='user-interests' key={index}>
                        {interest}
                      </div>
                    )
                  )}
                </div>

                <h3 className='user-card-title py-5'>Description :</h3>
                <div className='user-details'></div>
                <div className='user-description'>
                  <p>{usersToExplore[currentIndex].description}</p>
                </div>
              </div>
            </div>

            <div className='next-card-placeholder'></div>
            <div>
              {' '}
              <Icon
                onClick={() => handleUserInteraction(false)}
                path={mdiChevronRight}
                size={2}
                horizontal
                vertical
                rotate={180}
                className='next-card-icon'
              />
            </div>
          </div>
        ) : (
          <div id='explore-end'>No more users to explore</div>
        )}
        <div className='interaction-buttons'>
          <div
            className='like'
            onClick={() =>
              handleUserInteraction(true, usersToExplore[currentIndex]._id)
            }
          >
            <Icon
              path={mdiCardsHeartOutline}
              title='like'
              size={1.1}
              horizontal
              vertical
              rotate={180}
              className='like-icon'
            />
            <h3 className='font-medium'>Like</h3>
          </div>
          <div className='next' onClick={() => handleUserInteraction(false)}>
            <Icon
              path={mdiChevronRight}
              title='checkmark'
              size={1.5}
              horizontal
              vertical
              rotate={180}
              className='next-icon gray'
            />
            <h3 className='gray font-medium'>Next</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreHome;
