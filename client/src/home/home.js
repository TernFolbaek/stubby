import React from 'react';

const Home = () => {
  return (
    <div className='background-hero min-h-screen bg-no-repeat  bg-center .App'>
      <div className='text-right no-background right-aligned-div p-20'>
        <h1 className='text-5xl font-bold no-background text-[80px]'>Stubby</h1>
        <p className='text-xl mt-4 no-background text-[60px]'>
          The practical and intuitive app which students across institutions use
          to connect through their passion in their subject and interests
        </p>
        <div className='mt-8 no-background '>
          <button className=' hover:bg-transparent hover:text-blue-500 bg-blue-500 text-white font-bold py-2 px-10 rounded-full mr-4 text-[17px] cursor-pointer border-none transition duration-500'>
            Sign Up
          </button>
          <button className='hover:bg-blue-500 hover:text-white bg-transparent text-blue-500 font-semibold py-2 px-10 border border-blue-500 rounded-full text-[17px] cursor-pointer transition duration-500'>
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
