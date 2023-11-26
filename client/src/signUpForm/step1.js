import React from 'react';

const Step1 = ({ setFormData, formData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className='left-half w-full md:w-2/5 px-2 mb-6'>
        {/* First Name */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='firstName'
          >
            First Name
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='firstName'
            type='text'
            placeholder='First Name'
            name='firstName'
            value={formData.firstName || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* Last Name */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='lastName'
          >
            Last Name
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='lastName'
            type='text'
            placeholder='Last Name'
            name='lastName'
            value={formData.lastName || ''}
            onChange={handleChange}
            required
          />
        </div>
        {/* Institution of Studies */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='institution'
          >
            Institution of Studies
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='institution'
            type='text'
            placeholder='Institution'
            name='institution'
            value={formData.institution || ''}
            onChange={handleChange}
          />
        </div>
        {/* Living Location */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='location'
          >
            Living Location
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
            id='location'
            type='text'
            placeholder='City'
            name='location'
            value={formData.location || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='right-half w-full md:w-2/5 px-2 mb-6'>
        {/* Gender */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='gender'
          >
            Gender
          </label>
          <div className='relative'>
            <select
              className='block appearance-none w-full bg-gray-200 border rounded py-3 px-4 pr-8 leading-tight focus:outline-none focus:bg-white'
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
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
              <svg
                className='fill-current h-4 w-4'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
              </svg>
            </div>
          </div>
        </div>
        {/* LinkedIn Profile */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='linkedin'
          >
            LinkedIn Profile
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
            id='linkedin'
            type='url'
            placeholder='LinkedIn URL'
            name='linkedin'
            value={formData.linkedin || ''}
            onChange={handleChange}
          />
        </div>
        {/* Current Job Position */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='position'
          >
            Current Job Position
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
            id='position'
            type='text'
            placeholder='Position'
            name='position'
            value={formData.position || ''}
            onChange={handleChange}
          />
        </div>
        {/* Birthday */}
        <div className='w-full px-3 mb-6'>
          <label
            className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
            htmlFor='birthday'
          >
            Birthday
          </label>
          <input
            className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white'
            id='birthday'
            type='date'
            name='birthday'
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
