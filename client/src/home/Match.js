import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Match = ({ matchId }) => {
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/api/profile/${matchId}`);
        
        const user = response.data;

        // Directly use base64 data for the image
        const imageDataUrl = user.userImage 
          ? `data:${user.userImage.contentType};base64,${user.userImage.data}` 
          : '';

        // Handling interests
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

        // Cleaning up user data
        const institution = user.institution?.replace(/"/g, '') || '';
        const location = user.location?.replace(/"/g, '') || '';
        const description = user.description?.replace(/"/g, '') || '';
        const firstName = user.firstName?.replace(/"/g, '') || '';
        const lastName = user.lastName?.replace(/"/g, '') || '';

        setMatchInfo({
          ...user,
          userImage: imageDataUrl,
          interests: interestsArray,
          institution,
          location,
          description,
          firstName,
          lastName,
        });

      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    fetchMatchInfo();
  }, [matchId]);

  if (!matchInfo) return <div>Loading...</div>;

  return (
    <div className='match'>
      <div className='top-section'>
        <img src={matchInfo.userImage} alt={`${matchInfo.firstName} ${matchInfo.lastName}`} style={{ width: '100px', height: '100px' }} />
        <h3>{`${matchInfo.firstName} ${matchInfo.lastName}`}</h3>
      </div>
      <div className="interests-container">
        {matchInfo.interests.map((interest, index) => (
          <span key={index} className="interest">{interest}</span>
        ))}
      </div>
    </div>
  );
  
};

export default Match;
