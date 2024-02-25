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
    <div className='flex flex-col h-screen justify-center items-center '>
      <div className='w-full max-w-xs p-5 border-2 border-gray-300 rounded-lg bg-dark-grey h-[300px]'>
        <h1 className='text-2xl font-bold mb-5 bg-inherit'>Settings</h1>
        <div
          onClick={handleEditProfile}
          className='w-[80%] bg-blue-400 text-white p-2 rounded mb-4 hover:bg-blue-500 transition duration-200 cursor-pointer '
        >
          Edit Profile
        </div>
        <div
          onClick={openModal}
          className='w-[80%] bg-purple-500 text-white p-2 rounded hover:bg-purple-600 transition duration-200 cursor-pointer'
        >
          Delete Account
        </div>
        {isModalOpen && (
          <DeleteModal
            onClose={closeModal}
            onDeleteConfirm={handleDeleteConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
