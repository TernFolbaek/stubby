import React from 'react';
import axios from 'axios';

const DevButton = () => {
    const handleCreateUsers = async () => {
        try {
            await axios.post('/api/dev/create-users');
            alert('Users created');
        } catch (error) {
            console.error('Error creating users', error);
        }
    };

    const handleDeleteUsers = async () => {
        try {
            await axios.post('/api/dev/delete-users');
            alert('Users deleted');
        } catch (error) {
            console.error('Error deleting users', error);
        }
    };

    return (
        <div className='flex dev-buttons'>
            <button className='text-white' onClick={handleCreateUsers}>Create Users</button>
            <button className='text-white' onClick={handleDeleteUsers}>Delete Users</button>
        </div>
    );
}

export default DevButton;
