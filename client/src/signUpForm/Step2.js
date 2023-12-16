import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiDotsHorizontal } from '@mdi/js';
import SubjectModal from './modals/SubjectModal';

const predefinedSubjects = [
  'sciences',
  'languages',
  'arts',
  'business',
  'technology',
  'design',
];

const categoriesWithSubCategories = {
  sciences: ['Biology', 'Physics', 'Chemistry'],
  languages: ['English', 'Spanish', 'French'],
  arts: ['Painting', 'Sculpture', 'Photography'],
  business: [
    'Economics',
    'Marketing',
    'Finance',
    'Management',
    'Entrepreneurship',
  ],
  technology: ['Computer Science', 'AI', 'Data Science'],
  design: ['Graphic Design', 'UX/UI', 'Interior Design'],
};

const Step2 = ({ setFormData, formData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');
  const maxSubjects = 5;

  const openModal = (category) => {
    setCurrentCategory(category);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory('');
  };

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
  const removeSubjectFromModal = (subjectToRemove) => {
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
        <h4 className='select-topics-text pb-7'>
          submit a minimum of 3 topics of interest to show other users which
          areas you burn for:
        </h4>
        {/* <div className='custom-subject-input'>
          <input
            type='text'
            placeholder='custom subject'
            onKeyDown={handleCustomSubject}
            className='custom-subject-textbox text-center'
          />
        </div> */}

        <div className='predefined-subjects'>
          {predefinedSubjects.map((subject, index) => (
            <div
              key={index}
              onClick={() => openModal(subject)}
              className='subject-button text-mono text-black flex items-center gap-5'
            >
              <Icon
                className='three-dots-icon'
                path={mdiDotsHorizontal}
                size={1}
              />
              {subject}
            </div>
          ))}
        </div>
      </div>
      {isModalOpen && (
        <SubjectModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          handleSubjectSelect={handleSubjectSelect}
          removeSubject={removeSubjectFromModal}
          subCategories={categoriesWithSubCategories[currentCategory]}
        />
      )}

      <div className='picks'>
        <h1 className='selected-topics-text'>
          selected topics ({formData.interests.length}/{maxSubjects}):
        </h1>
        <h4 className='text-center'>click to unselect</h4>
        <div className='selected-subjects'>
          {formData.interests.map((subject, index) => (
            <div
              key={index}
              className='subject-tag'
              onClick={() => removeSubject(subject)}
            >
              {subject}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Step2;
