import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Match = ({ matchId, onSelectMatch }) => {
  const [matchInfo, setMatchInfo] = useState(null);


  const goToMatchDetail = () => {
    onSelectMatch(matchId); 
  };
  
  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/api/profile/${matchId}`);

        const user = response.data;

        const imageDataUrl = user.userImage
          ? `data:${user.userImage.contentType};base64,${user.userImage.data}`
          : '';

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

        const truncateDescription = (description) => {
          const words = description.split(/\s+/);
          if (words.length > 20) {
            return words.slice(0, 13).join(' ') + '...';
          }
          return description;
        };

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
          description: truncateDescription(description),
          firstName,
          lastName,
        });
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    fetchMatchInfo();
  }, [matchId]);

  if (!matchInfo) return <div className='loading-ring'></div>;

  return (
    <div className='match' onClick={goToMatchDetail}>
      <img
        src={matchInfo.userImage}
        alt={`${matchInfo.firstName} ${matchInfo.lastName}`}
        className='match-image'
      />
      <div className="match-text">
        <div className='match-name'>{`${matchInfo.firstName} ${matchInfo.lastName}`}</div>
        <div className='match-description'>{`${matchInfo.description}`}</div>
      </div>

    </div>
  );
};

export default Match;
