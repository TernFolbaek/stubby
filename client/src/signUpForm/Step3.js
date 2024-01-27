import React from 'react';
import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const Step3 = ({ setFormData, formData }) => {
  const handleDescriptionChange = (e) => {
    setFormData({ ...formData, description: e.target.value });
  };

  const generateIdea = async () => {
    const interests = formData.interests.join(', ');
    const prompt = `Write a 150 character long description of myself based off my  ${interests}, make sure this description, make sure it is not too formal so it is inviting to other users to read.`;

    try {
      const completion = await openai.chat.completions.create({
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        model: 'gpt-3.5-turbo',
      });

      if (completion.choices && completion.choices.length > 0) {
        const description = completion.choices[0].message.content.trim();
        setFormData({ ...formData, description });
      }
    } catch (error) {
      console.error('Error generating description:', error);
    }
  };

  return (
    <div className='flex justify-around'>
      <div className='text-mono flex-col items-center text-[25px] w-[50%]'>
        <h4 className='mb-5'>
          Describe Yourself{' '}
          <span className='gray font-light'>(max 400 characters)</span>
        </h4>

        <textarea
          className='description-textarea text-justify'
          maxLength='400'
          placeholder='Your description ...'
          value={formData.description || ''}
          onChange={handleDescriptionChange}
        />
        <div className='character-count'>
          {formData.description ? formData.description.length : 0}/400
        </div>
      </div>
      <button onClick={generateIdea}>nice</button>

      <div className='profile-preview'>
        <div className='preview-image-name flex gap-[15px] items-center bg-inherit'>
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt='Profile Preview'
              onLoad={() => URL.revokeObjectURL(formData.profileImage)}
              className='preview-image'
            />
          )}
          <div className='preview-info text-left bg-inherit'>
            <h3 className='bg-inherit'>
              {formData.firstName || ''} {formData.lastName || ''}
            </h3>
            <h3 className='font-light bg-inherit'>
              {' '}
              <span className='gray bg-inherit'>Age:</span> {formData.age || ''}
            </h3>
            <h3 className='font-light bg-inherit'>
              {' '}
              <span className='gray bg-inherit'>Location:</span>{' '}
              {formData.location || ''}
            </h3>
            <h3 className='font-light bg-inherit'>
              {' '}
              <span className='gray bg-inherit'>Establishment:</span>{' '}
              {formData.institution || ''}
            </h3>
          </div>
        </div>
        <h3 className='text-left mt-2 bg-inherit'>Subjects:</h3>
        <div className='preview-interest-card-container'>
          {formData.interests.map((interest, index) => (
            <div className='preview-user-interests' key={index}>
              {interest}
            </div>
          ))}
        </div>
        <h3 className='text-left mt-2 bg-inherit'>Description:</h3>
        <h5 className='text-justify font-light gray bg-inherit'>
          {formData.description || 'Your description will appear here...'}
        </h5>
      </div>
    </div>
  );
};

export default Step3;
