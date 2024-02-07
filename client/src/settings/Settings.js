import React from 'react';
import { useState } from 'react';
import DeleteModal from './deleteModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditProfile = () => {
    console.log('edit');
  };

  const handleDeleteConfirm = async (password) => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await axios.post(
        '/api/profile/delete',
        {
          userId,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Deletion response:', response.data);
      navigate('/');
    } catch (error) {
      console.error(
        'There was a problem deleting your account',
        error.response
      );
    }
  };

  return (
    <div className='max-w-lg mx-auto p-5'>
      <h1 className='text-2xl font-bold mb-5'>Settings</h1>
      <button
        onClick={handleEditProfile}
        className='w-full bg-blue-500 text-white py-2 rounded mb-4 hover:bg-blue-600 transition duration-200'
      >
        Edit Profile
      </button>
      <button
        onClick={openModal}
        className='w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition duration-200'
      >
        Delete Account
      </button>
      {isModalOpen && (
        <DeleteModal
          onClose={closeModal}
          onDeleteConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default Settings;
