// SignUpForm.js (Controller Component with Tailwind CSS)
import React, { useState } from 'react';
import { useLocation } from 'wouter';
import axios from 'axios';
import Step1 from './step1';
import Step2 from './Step2';
import Step3 from './Step3';
const SignUpForm = () => {
  const [, navigate] = useLocation();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    institution: '',
    location: '',
    gender: '',
    linkedin: '',
    position: '',
    birthday: '',
    interests: [],
    description: '',
    profileImage: null,
  });

  const handleNextStep = () => {
    if (currentStep === 2 && formData.interests.length < 3) {
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
    const profileData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      profileData.append(key, value);
    });
    if (!userId) {
      console.error('No user ID found');
      return;
    }

    console.log(profileData);

    try {
      const response = await axios.post('/api/profile/signup', profileData);
      console.log(response.data);
      navigate('/profile');
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
      <div>
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
