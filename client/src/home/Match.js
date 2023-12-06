import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Match = ({ matchId }) => {
  const [matchInfo, setMatchInfo] = useState(null);

  useEffect(() => {
    const fetchMatchInfo = async () => {
      try {
        const response = await axios.get(`/api/profile/${matchId}`);
        console.log(response.data)
        setMatchInfo(response.data);
        console.log(matchInfo)
      } catch (error) {
        console.error('Error fetching match info:', error);
      }
    };

    fetchMatchInfo();
  }, [matchId]);

  if (!matchInfo) return <div>Loading...</div>;

  return (
    <div>
      <h3>{matchInfo.username}</h3>
      {/* display other info */}
    </div>
  );
};

export default Match;
