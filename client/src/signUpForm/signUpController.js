// SignUpForm.js (Controller Component with Tailwind CSS)
import React, { useState } from 'react';
import Step1 from './step1';

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
  });

  const handleNextStep = () => {
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
    <div className="flex flex-col h-screen justify-between">
      <div>
        {currentStep === 1 && (
          <Step1 setFormData={handleFormDataChange} formData={formData} />
        )}
        {/* You can include Step2 and Step3 components here as well */}
      </div>

      {/* Render navigation buttons and form controls */}
      <div className='w-full px-4 py-3 bg-gray-100 border-t fixed inset-x-0 bottom-0 flex justify-between no-background'>
        {currentStep > 1 && (
          <button
            onClick={handlePreviousStep}
            className='px-4 py-2 text-sm text-gray-700 bg-white rounded shadow-sm hover:bg-gray-50 cursor-pointer border-none'
          >
            Back
          </button>
        )}
        {currentStep < 3 && (
          <button
            onClick={handleNextStep}
            className='px-4 py-2 text-sm text-white bg-blue-600 rounded shadow-sm hover:bg-blue-700 cursor-pointer'
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            onClick={handleSubmit}
            className='px-4 py-2 text-sm text-white bg-green-600 rounded shadow-sm hover:bg-green-700'
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default SignUpForm;
