import React from 'react';
import Icon from '@mdi/react';
import { mdiCogOutline, mdiCompassOutline } from '@mdi/js';
import NotificationsButton from '../ExploreNavbar/Notifications';
import { useNavigate } from 'react-router-dom';


const ExploreNavbar = ({ onExploreClick }) => {
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');
  };
  const handleExploreClick = () => {
    navigate('/explore-home');
  };

  return (
    <div className='explore-nav flex justify-between items-center h-15 w-full'>
      <h3 className='italic'>Stubby</h3>
      <div className='navbarStyle explore-navbar-buttons flex gap-5 px-5 bg-inherit'>
        <div
          onClick={onExploreClick || handleExploreClick}
          className='flex items-center gap-2 py-2 px-2 rounded bg-button-purple cursor-pointer'
        >
          <Icon path={mdiCompassOutline} size={1} className='bg-none' />
          <h5 className='text-white bg-none font-normal pr-2'>Explore</h5>
        </div>
        <NotificationsButton />
        <div
          onClick={handleSettingsClick}
          className='flex items-center gap-3 py-2 px-2 rounded bg-button-light cursor-pointer'
        >
          <Icon path={mdiCogOutline} size={0.8} className='bg-none' />
        </div>
      </div>
    </div>
  );
};

export default ExploreNavbar;
