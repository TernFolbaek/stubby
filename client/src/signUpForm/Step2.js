import React from 'react';

const predefinedSubjects = [
  'Math',
  'Science',
  'English',
  'Danish',
  'Computer Science',
  'History',
  'Art',
  'Economics',
  'Philosophy',
  'Music',
  'Physics',
  'Chemistry',
  'Biology',
  'Geography',
  'Political Science',
];

const Step2 = ({ setFormData, formData }) => {
  const maxSubjects = 5;

  const handleSubjectSelect = (subject) => {
    if (
      !formData.interests.includes(subject) &&
      formData.interests.length < maxSubjects
    ) {
      setFormData({
        ...formData,
        interests: [...formData.interests, subject],
      });
    }
  };

  const handleCustomSubject = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      handleSubjectSelect(e.target.value.trim());
      e.target.value = '';
    }
  };

  const removeSubject = (subjectToRemove) => {
    setFormData({
      ...formData,
      interests: formData.interests.filter(
        (subject) => subject !== subjectToRemove
      ),
    });
  };

  return (
    <div className='step-2-flex'>
      <div className='step-2-container text-mono text-[25px]'>
        <div className='selected-topics-count'></div>
        <h4 className='select-topics-text'>
          Select a minimum of 3 topics of interest to show other users which
          areas you burn for:
        </h4>
        <div className='custom-subject-input'>
          <input
            type='text'
            placeholder='Add Custom Subject'
            onKeyDown={handleCustomSubject}
            className='custom-subject-textbox'
          />
        </div>

        <div className='predefined-subjects'>
          {predefinedSubjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => handleSubjectSelect(subject)}
              className='subject-button text-mono text-black' 
            >
              {subject}
            </div>
          ))}
        </div>
      </div>

      <div className='picks'>
        <h1 className='text-center'>
          Selected Topics ({formData.interests.length}/{maxSubjects}):
        </h1>
        <h4 className='text-center'>click to remove</h4>
        <div className='selected-subjects'>
          {formData.interests.map((subject, index) => (
            <div key={index} className='subject-tag' onClick={() => removeSubject(subject)}>
              {subject}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
