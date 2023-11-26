import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';

const Home = () => {
  const fullText =
    'The practical and intuitive app which students across institutions use to connect through their passion in their subject and interests.';
  const [typedText, setTypedText] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    if (typing) {
      if (typedText.length < fullText.length) {
        setTimeout(() => {
          setTypedText(fullText.substring(0, typedText.length + 1));
        }, 35);
      } else {
        setTyping(false);
      }
    }
  }, [typedText, typing]);

  return (
    <div className='background-hero min-h-screen bg-no-repeat bg-cover bg-center'>
      <div className='text-right p-20 right-aligned-div '>
        <h1 className='text-5xl font-bold text-[80px] no-background italic'>Stubby</h1>
        <p className='text-xl mt-4 text-[60px] font-mono no-background'>
          {typedText}
          <span className='blinker'></span>
        </p>
        <div className='mt-8 no-background button-container right-aligned-div'>
        <Link
            to='/signUp'
            className='button-signup hover:bg-transparent hover:text-blue-500 bg-blue-500 text-white font-bold py-2 px-10 border rounded-full mr-4 text-[17px] cursor-pointer transition duration-500'
          >
            Sign Up
          </Link>

          <Link 
            to='/logIn' 
            className='button-login hover:bg-blue-500 hover:text-white bg-transparent text-blue-500 font-semibold py-2 px-10 border border-blue-500 rounded-full text-[17px] cursor-pointer transition duration-500'
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
