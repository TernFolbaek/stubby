import React from 'react';

const Step3 = ({ setFormData, formData }) => {
  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  return (
    <div className='step-3-container text-mono text-[25px]'>
      <h4>Describe Yourself (max 300 characters)</h4>
      <h6>This description will serve as a general overview of your topics of interests, goals, and accomplishments for your potential study mates</h6>
      <textarea
        className='description-textarea'
        maxLength='300'
        placeholder='Your description ...'
        value={formData.description || ''}
        onChange={handleDescriptionChange}
      />
      <div className='character-count'>
        {formData.description ? formData.description.length : 0}/400
      </div>
    </div>
  );
};

export default Step3;
