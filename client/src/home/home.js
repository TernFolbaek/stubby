import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'wouter';

const Home = () => {
  const fullText =
    'The practical and intuitive app which students across institutions use to connect through their passion in their subject and interests.';
  const [typedText, setTypedText] = useState('');
  const [typing, setTyping] = useState(true);
  const heroRef = useRef(null);

  useEffect(() => {
    if (typing) {
      if (typedText.length < fullText.length) {
        setTimeout(() => {
          setTypedText(fullText.substring(0, typedText.length + 1));
        }, 30);
      } else {
        setTyping(false);
      }
    }
  }, [typedText, typing]);

  useEffect(() => {
    const onScroll = () => {
      console.log('Scroll event fired');
      if (heroRef.current) {
        const { top, bottom } = heroRef.current.getBoundingClientRect();
        const height = window.innerHeight;
        let opacity = 1;

        if (top < 0) {
          opacity = 1 + (3 * top) / height;
        } else if (bottom > height) {
          opacity = 1 - (3 * (bottom - height)) / height;
        }

        opacity = Math.max(0, Math.min(1, opacity));

        // Apply opacity to each text element
        const textElements = heroRef.current.querySelectorAll('.text-element');
        textElements.forEach((element) => {
          element.style.opacity = opacity;
        });
      }
    };

    const container = document.querySelector('.home-container');
    if (container) {
      container.addEventListener('scroll', onScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  return (
    <div className='home-container'>
      <div
        ref={heroRef}
        className='background-hero min-h-screen bg-no-repeat bg-cover bg-center'
      >
        <div className='text-right p-20 right-aligned-div'>
          <h1 className='text-5xl font-bold text-[80px] no-background italic p-7 text-element'>
            Stubby
          </h1>
          <p className='text-xl mt-4 text-[60px] font-mono no-background text-element'>
            {typedText}
            <span className='blinker'></span>
          </p>

          <div className='mt-8 no-background button-container right-aligned-div home-buttons'>
            <Link
              to='/signUp'
              className='text-element button-signup hover:bg-transparent hover:text-purple-400 bg-purple-400 text-white font-bold py-2 px-10 border rounded-full mr-4 text-[17px] cursor-pointer transition duration-500'
            >
              Sign Up
            </Link>
            <Link
              to='/logIn'
              className='text-element button-login hover:bg-purple-400 hover:text-white bg-transparent text-purple-400 font-semibold py-2 px-10 border border-purple-400 rounded-full text-[17px] cursor-pointer transition duration-500'
            >
              Log In
            </Link>
          </div>
        </div>
      </div>
      <div className='scrollable-section'>
        <p>Scrollable content goes here...</p>
      </div>
    </div>
  );
};

export default Home;
