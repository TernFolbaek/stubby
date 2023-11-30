import React, { useState } from 'react';
import '../App.css';
import googleIcon from '../images/google.png';
import axios from 'axios';
import { Link, useLocation } from 'wouter';

const LogIn = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [, navigate] = useLocation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users/login', formData);
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userId', response.data.userId)
      console.log('here')
      let hasProfile = response.data.hasProfile
      console.log(hasProfile)
      if(hasProfile){
        navigate('/explore-home')
      }
      navigate('/profile-info'); 
    } catch (error) {
      console.error('Login error', error.response);
    }
  };

  return (
    <div className="full-width-container">
      <form className="LogIn flex-col" onSubmit={handleSubmit}>
        <h1 id='LogIn' className='text-black'>Log In</h1>
        <input type="text" name="username" id="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
        <input type="password" name="password" id="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />

        <button type="submit" className="google-btn">Log In</button>

        <div className="divider no-background">
          <hr className="divider-line" />
          <span className="divider-text no-background text-black">or</span>
          <hr className="divider-line" />
        </div>

        <button className="google-btn">
          <img src={googleIcon} alt="Google" className="google-icon" />
          Continue with Google
        </button>

        <div className="signup-prompt no-background text-black">
          New to stubby? <Link href="/signup" className="signup-link no-background">sign up</Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;
