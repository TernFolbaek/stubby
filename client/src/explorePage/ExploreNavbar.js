import React from 'react';
import Icon from '@mdi/react';
import { mdiCogOutline, mdiBellOutline, mdiCompassOutline } from '@mdi/js';

const ExploreNavbar = () => {
  return (
    <div className='navbarStyle flex justify-end items-center h-10 w-full'>
      <div className="explore-navbar-buttons flex gap-5 px-5 bg-inherit">
          <div className='flex items-center gap-2 py-1 px-2 rounded bg-button-purple cursor-pointer'>
            <Icon path={mdiCompassOutline} size={1} className='bg-none' />
            <h5 className='text-white bg-none font-normal pr-2'>Explore</h5>
          </div>
          <div className='flex items-center gap-3 py-1 px-2 rounded bg-button-light cursor-pointer'>
            <Icon path={mdiBellOutline} size={0.8} className='bg-none'  />
          </div>
          <div className='flex items-center gap-3 py-1 px-2 rounded bg-button-light cursor-pointer'>
            <Icon path={mdiCogOutline} size={0.8} className='bg-none'  />
          </div>
      </div>
    </div>
  );
};

export default ExploreNavbar;
