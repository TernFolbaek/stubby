import React from 'react';

const Step1 = ({ setFormData, formData }) => {
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return parseInt(age);
  };

  const handleChange = (e) => {
    const { name, type } = e.target;
    const value = type === 'file' ? e.target.files[0] : e.target.value;
  
    if (name === 'birthday') {
      const age = calculateAge(value);
      console.log(age)
      setFormData({ ...formData, birthday: value, age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  return (
    <div className='form-container text-mono text-[20px] bg-dark'>
      <div className='left-half w-full md:w-2/5 px-2 mb-6 flex-col bg-dark'>
        {/* First Name */}
        <div className='name '>
          <div className='input-field flex-1 bg-dark'>
            <label htmlFor='firstName'>First Name</label>
            <input
              className='step1-input'
              id='firstName'
              name='firstName'
              type='text'
              autoComplete='given-name'
              required
              placeholder='First Name'
              value={formData.firstName || ''}
              onChange={handleChange}
            />
          </div>
          {/* Last Name */}
          <div className='input-field flex-1 '>
            <label htmlFor='lastName'>Last Name</label>
            <input
              className='step1-input'
              id='lastName'
              name='lastName'
              type='text'
              placeholder='Last Name'
              value={formData.lastName || ''}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        {/* Institution of Studies */}
        <div className='input-field'>
          <label htmlFor='institution'>Institution of Studies</label>
          <input
            className='step1-input'
            id='institution'
            name='institution'
            type='text'
            placeholder='Institution'
            value={formData.institution || ''}
            onChange={handleChange}
          />
        </div>
        {/* Living Location */}
        <div className='input-field'>
          <label htmlFor='location'>Living Location</label>
          <input
            className='step1-input'
            id='location'
            name='location'
            type='text'
            placeholder='City'
            value={formData.location || ''}
            onChange={handleChange}
          />
        </div>
        <div className='input-field'>
          <label htmlFor='profileImage'>Profile Image</label>
          <input
            className='step1-input'
            id='profileImage'
            name='profileImage'
            type='file'
            accept='image/*' // Accepts all image formats
            onChange={handleChange}
            required
          />
          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt='Profile Preview'
              className='profile-image-preview'
              onLoad={() => URL.revokeObjectURL(formData.profileImage)} // Clean up the object URL after loading
            />
          )}
        </div>
      </div>

      <div className='right-half w-full md:w-2/5 px-2 mb-6'>
        {/* Gender */}
        <div className='input-field'>
          <label htmlFor='gender'>Gender</label>
          <select
            className='step1-input'
            id='gender'
            name='gender'
            value={formData.gender || ''}
            onChange={handleChange}
            required
          >
            <option value=''>Select...</option>
            <option value='male'>Man</option>
            <option value='female'>Woman</option>
            <option value='other'>Other</option>
          </select>
        </div>
        {/* LinkedIn Profile */}
        <div className='input-field'>
          <label htmlFor='linkedin'>LinkedIn Profile</label>
          <input
            className='step1-input'
            id='linkedin'
            name='linkedin'
            type='url'
            placeholder='LinkedIn URL'
            value={formData.linkedin || ''}
            onChange={handleChange}
          />
        </div>
        {/* Current Job Position */}
        <div className='input-field'>
          <label htmlFor='position'>Current Job Position</label>
          <input
            className='step1-input'
            id='position'
            name='position'
            type='text'
            placeholder='Position'
            value={formData.position || ''}
            onChange={handleChange}
          />
        </div>
        {/* Birthday */}
        <div className='input-field'>
          <label htmlFor='birthday'>Birthday</label>
          <input
            className='step1-input cursor-pointer'
            id='birthday'
            name='birthday'
            type='date'
            value={formData.birthday || ''}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );
};

export default Step1;
