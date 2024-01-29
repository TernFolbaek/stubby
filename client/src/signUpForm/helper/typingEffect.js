import React, { useEffect, useState } from 'react';

// Component to simulate typing effect for text
const TypingEffect = ({ text, onTypingComplete, typingSpeed }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    setDisplayedText('');
    if (text) {
      let index = 0;
      const intervalId = setInterval(() => {
        if (index < text.length) {
          setDisplayedText((prev) => prev + text.charAt(index));
          index++;
        } else {
          clearInterval(intervalId);
          if (onTypingComplete) {
            onTypingComplete(); // Call the callback function when typing is complete
          }
        }
      }, typingSpeed);

      // Clear interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [text, typingSpeed, onTypingComplete]);

  return displayedText; // Return the text that's being "typed"
};

export default TypingEffect;
