import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import AppInfoSection from './AppInfo';

const Home = () => {
  const fullText =
    'The practical and intuitive app which students across institutions use to connect through their passion in their subject and interests.';
  const [typedText, setTypedText] = useState('');
  const [typing, setTyping] = useState(true);
  const heroRef = useRef(null);
  const containerRef = useRef(null);

  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
      factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
  }

  function rgbToCss(rgb) {
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  }

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

        const textElements = heroRef.current.querySelectorAll('.text-element');
        textElements.forEach((element) => {
          element.style.opacity = opacity;
        });
        const stubbyElement = heroRef.current.querySelector('.stubby-home');
        if (stubbyElement) {
          const startColor = [255, 255, 255]; // white
          const endColor = [183, 135, 245]; // Light purple
          const startFontSize = 80; // Starting font size in pixels
          const endFontSize = 50;

          let fontSizeFactor = Math.abs(top / height); // Adjust as needed
          fontSizeFactor = Math.max(0, Math.min(1, fontSizeFactor));

          const interpolatedFontSize =
            startFontSize + (endFontSize - startFontSize) * fontSizeFactor;
          stubbyElement.style.fontSize = `${interpolatedFontSize}px`;

          let colorFactor = Math.abs(top / height); // Adjust as needed
          colorFactor = Math.max(0, Math.min(1, colorFactor));

          const blendedColor = interpolateColor(
            startColor,
            endColor,
            colorFactor
          );
          stubbyElement.style.color = rgbToCss(blendedColor);
        }

        // Calculate the color value based on the scroll position
        let colorValue = Math.round((Math.abs(bottom) / Math.abs(top)) * 255);
        colorValue = 255 - Math.max(0, Math.min(colorValue, 255)); // Invert and clamp the value


        const scrollArrow = document.querySelector('.scroll-arrow');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (scrollArrow) {
          scrollArrow.style.color = `rgb(${colorValue},${colorValue},${colorValue})`;

          if (Math.abs(top) >= bottom) {
            scrollIndicator.classList.add('flipped');
          } else {
            scrollIndicator.classList.remove('flipped');
          }
        }
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
    <div ref={containerRef} className='home-container'>
      <div
        ref={heroRef}
        className='background-hero min-h-screen bg-no-repeat bg-cover bg-center'
      >
        <div className='text-right p-20 right-aligned-div'>
          <h1 className='text-5xl font-bold text-[80px] no-background italic p-7 stubby-home'>
            Stubby
          </h1>
          <p className='text-xl mt-40 text-[60px] font-mono no-background text-element typed-home'>
            {typedText}
            <span className='blinker'></span>
          </p>

          <div className='mt-20 no-background button-container right-aligned-div home-buttons'>
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
        <div className='scroll-indicator'>
          <div className='scroll-arrow'></div>
        </div>
      </div>

      <AppInfoSection scrollContainerRef={containerRef} />
    </div>
  );
};

export default Home;
