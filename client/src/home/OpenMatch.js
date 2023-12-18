// MatchDetail.js or MatchDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const MatchDetail = () => {
  const { userMatchId } = useParams();

  return (
    <div>
      <h1>Match Details</h1>
      <p>Showing details for match ID: {userMatchId}</p>

    </div>
  );
};

export default MatchDetail;
