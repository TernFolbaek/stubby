import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import googleIcon from '../images/google.png';
import axios from 'axios';
import { useLocation } from 'wouter';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    repeatedPassword: '',
    email: '',
  });

  const [, navigate] = useLocation();

  const handleOutsideClick = (e) => {
    if (e.target.id === 'modal-backdrop') {
      navigate('/');
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleOutsideClick);
    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.repeatedPassword) {
      alert("Passwords don't match!");
      return;
    }
    try {
      const response = await axios.post('/api/users/signup', {
        username: formData.username,
        password: formData.password,
        email: formData.email,
      });

      localStorage.setItem('authToken', response.data.token);
      navigate('/logIn');
    } catch (error) {
      console.error('An error occurred during sign-up', error.response);
    }
  };

  return (
    <div
      id='modal-backdrop'
      className='full-width-container background-hero-dark min-h-screen bg-no-repeat bg-cover bg-center text-black'
    >
      <h1
        className='h1-stubby cursor-pointer'
        onClick={() => {
          console.log('Heading clicked, navigating to /explore-home');
          navigate('/');
        }}
      >
        Stubby
      </h1>
      <form
        className='LogIn flex-col'
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
      >
        <h1 id='SignUp'>Sign Up</h1>
        <input
          type='text'
          name='username'
          id='username'
          placeholder='username'
          value={formData.username}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='password'
          id='password'
          placeholder='password'
          value={formData.password}
          onChange={handleInputChange}
        />
        <input
          type='password'
          name='repeatedPassword'
          id='repeatedPassword'
          placeholder='repeat password'
          value={formData.repeatedPassword}
          onChange={handleInputChange}
        />
        <input
          type='email'
          name='email'
          id='email'
          placeholder='your email'
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className='flex justify-center no-background'>
          <button
            type='submit'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full w-32 focus:outline-none focus:shadow-outline transition duration-300 ease-in-out border-none cursor-pointer '
          >
            Sign Up
          </button>
        </div>

        <div className='divider no-background'>
          <hr className='divider-line' />
          <span className='divider-text no-background text-black'>or</span>
          <hr className='divider-line' />
        </div>

        <button className='google-btn'>
          <img src={googleIcon} alt='Google' className='google-icon' />
          Continue with Google
        </button>
      </form>
    </div>
  );
};

export default SignUp;
