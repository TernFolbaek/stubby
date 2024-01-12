import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MatchDetail = ({ matchId }) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userId = matchId;
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
    

        const imageDataUrl = userImage && userImage.data && userImage.contentType
          ? `data:${userImage.contentType};base64,${userImage.data}`
          : '';
    
          let interestsArray = [];
          if (Array.isArray(response.data.interests) && interests.length > 0) {
            try {
              interestsArray = JSON.parse(interests[0]);
            } catch (e) {
              console.error('Error parsing interests:', e);
              interestsArray = [];
            }
          } else if (typeof interests === 'string') {
            try {
              interestsArray = JSON.parse(interests);
            } catch (e) {
              console.error('Error parsing interests:', e);
              interestsArray = [];
            }
          }
    

        const firstName = response.data.firstName?.replace(/"/g, '') || '';
        const lastName = response.data.lastName?.replace(/"/g, '') || '';
        const cleanedLocation = location?.replace(/"/g, '') || '';
        const cleanedDescription = description?.replace(/"/g, '') || '';
        const institution = response.data.institution?.replace(/"/g, '') || '';

        setUserInfo({
          username,
          email,
          location: cleanedLocation,
          age,
          institution,
          interests: interestsArray,
          likes,
          matches,
          description: cleanedDescription,
          userImage: imageDataUrl,
          firstName,
          lastName,
        });
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    
    fetchUserInfo();
  }, [matchId]);

  if (!userInfo) return <div>Loading match details...</div>;


  return (
    <div className='user-profile-card-match'>
              <div className='user-card-top'>
                <div className='user-info'>
                  <img
                    src={userInfo.userImage}
                    alt={userInfo.username}
                    className='profile-image'
                  />
                </div>
                <div className='user-information'>
                  <h2 className='font-semibold'>
                    {userInfo.username}{' '}
                  </h2>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Age:</span>{' '}
                    {userInfo.age}{' '}
                  </h3>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Location:</span>{' '}
                    {userInfo.location}
                  </h3>
                  <h3 className='font-light'>
                    <span className='gray bg-inherit'>Establishment:</span>{' '}
                    {userInfo.institution}
                  </h3>
                </div>
              </div>
              <div className='user-card-bottom'>
                <h3 className='user-card-title pb-2'>Subjects:</h3>
                <div className='interest-card-container'>
                  {userInfo.interests.map(
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
                  <p>{userInfo.description}</p>
                </div>
              </div>
            </div>

  );
};

export default MatchDetail;
