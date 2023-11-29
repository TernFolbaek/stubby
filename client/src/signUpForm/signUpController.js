// SignUpForm.js (Controller Component with Tailwind CSS)
import React, { useState } from 'react';
import Step1 from './step1';
import Step2 from './Step2';

const SignUpForm = () => {
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
    subjects: [],
  });

  const handleNextStep = () => {
    if (currentStep === 2 && formData.subjects.length < 3) {
      alert('Please select at least 3 topics of interest.'); 
      return; 
    }
    setCurrentStep((prevStep) => prevStep + 1);
    
  };

  const handlePreviousStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    // Handle form submission
  };

  const handleFormDataChange = (newData) => {
    setFormData((prevFormData) => ({ ...prevFormData, ...newData }));
  };

  return (
    <div>
      <div className='custom-hr' />
      <div>
        {currentStep === 1 && (
          <Step1 setFormData={handleFormDataChange} formData={formData} />
        )}
        {currentStep === 2 && (
          <Step2 setFormData={handleFormDataChange} formData={formData} />
        )}
      </div>

      {/* Render navigation buttons and form controls */}
      <div className=''>
        <div className='next-back'>
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
