// SubjectModal.js
import React, { useState } from 'react';
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';

const SubjectModal = ({
  isOpen,
  closeModal,
  handleSubjectSelect,
  removeSubject,
  subCategories,
}) => {
  const [selectedSubCategories, setSelectedSubCategories] = useState({});

  if (!isOpen) {
    return null;
  }
  const handleSubCategoryClick = (subCategory) => {
    const isSelected = selectedSubCategories[subCategory];
    setSelectedSubCategories({
      ...selectedSubCategories,
      [subCategory]: !isSelected,
    });

    if (!isSelected) {
      handleSubjectSelect(subCategory);
    } else {
      removeSubject(subCategory); 
    }
  };
  const handleBackgroundClick = () => {
    closeModal();
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='modal' onClick={handleBackgroundClick}>
      <div className='modal-content' onClick={handleModalContentClick}>
        <h2 className='bg-white text-black text-center'>Select a Subject</h2>
        {subCategories.map((subCategory, index) => (
          <div
            key={index}
            className='modal-subject'
            onClick={() => handleSubCategoryClick(subCategory)}
          >
            {subCategory}
            <div className='checkbox-icon'>
              {selectedSubCategories[subCategory] ? (
                <Icon path={mdiCheck} size={1} />
              ) : (
                <div className='empty-checkbox'></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectModal;
