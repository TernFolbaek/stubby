import React, { useState } from 'react';
import axios from 'axios';
import Icon from '@mdi/react';
import { mdiBellOutline } from '@mdi/js';

const NotificationsButton = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const fetchNotifications = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(
        `/api/notifications/unexplored/${userId}`
      );

      if (
        response.data.message === 'You have yet to send your first message to '
      ) {
        return;
      } else {
        setNotificationMessage(response.data.message);
      }
    } catch (error) {
      console.error('Error fetching unexplored matches:', error);
    }
  };

  const handleNotificationsClick = (event) => {
    event.stopPropagation();
    setShowNotifications((currentShow) => {
      if (!currentShow) {
        fetchNotifications();
      }
      return !currentShow;
    });
  };

  return (
    <div className='flex items-center gap-3 py-2 px-2 rounded bg-button-light cursor-pointer'>
      <Icon
        path={mdiBellOutline}
        size={0.8}
        onClick={handleNotificationsClick}
        className='bg-none'
      />
      {showNotifications && (
        <div className='text-black notifications-content absolute  mt-2  bg-white shadow-lg p-4 rounded overflow-visible'>
          {notificationMessage || 'No new notifications'}
        </div>
      )}
    </div>
  );
};

export default NotificationsButton;
