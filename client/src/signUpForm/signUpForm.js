import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Step1 from './step1';
import Step2 from './Step2';
import Step3 from './Step3';
import ProgressBar from './helper/ProgressBar';

const SignUpForm = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    location: '',
    gender: '',
    linkedin: '',
    position: '',
    age: '',
    interests: [],
    description: '',
    profileImage: null,
  });

  const handleNextStep = () => {
    if (currentStep === 2 && formData.interests.length < 0) {
      alert('Please select at least 3 topics of interest.');
      return;
    }
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleFormDataChange = (newData) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('No user ID found');
      return;
    }

    const profileData = new FormData();
    console.log(formData);
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'profileImage' && value instanceof File) {
        profileData.append(key, value);
      } else {
        profileData.append(key, JSON.stringify(value));
      }
    });
    profileData.append('userId', userId);

    try {
      const response = await axios.post('/api/profile/signup', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      navigate('/explore-home');
    } catch (error) {
      console.error(
        'There was a problem with the signup request:',
        error.response
      );
    }
  };

  return (
    <div className='bg-dark'>
      <div className='custom-hr' />
      <ProgressBar currentStep={currentStep} totalSteps={3} />

      <div className='py-7'> 
        {currentStep === 1 && (
          <Step1 setFormData={handleFormDataChange} formData={formData} />
        )}
        {currentStep === 2 && (
          <Step2 setFormData={handleFormDataChange} formData={formData} />
        )}
        {currentStep === 3 && (
          <Step3 setFormData={handleFormDataChange} formData={formData} />
        )}
      </div>

      {/* Render navigation buttons and form controls */}
      <div className='bg-dark'>
        <div className='next-back bg-dark'>
          {currentStep > 1 && (
            <button
              onClick={handlePreviousStep}
              className='button-login hover:bg-purple-400 hover:text-white bg-transparent text-purple-400 font-semibold py-2 px-10 border border-purple-400 rounded-full text-[17px] cursor-pointer transition duration-500'
            >
              Back
            </button>
          )}
          {currentStep < 3 && (
            <button
              onClick={handleNextStep}
              className='button-login hover:bg-purple-400 hover:text-white bg-transparent text-purple-400 font-semibold py-2 px-10 border border-purple-400 rounded-full text-[17px] cursor-pointer transition duration-500'
            >
              Next
            </button>
          )}

          {currentStep === 3 && (
            <button
              onClick={handleSubmit}
              className='button-login hover:bg-purple-400 hover:text-white bg-transparent text-purple-400 font-semibold py-2 px-10 border border-purple-400 rounded-full text-[17px] cursor-pointer transition duration-500'
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
