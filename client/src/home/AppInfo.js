import React, { useState, useEffect, useRef } from 'react';

import study from '../images/study.jpg';
import teamWork from '../images/teamwork.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const AppInfoSection = ({ scrollContainerRef }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const checkVisibility = () => {
    if (sectionRef.current) {
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const isVisible =
        sectionRect.top + sectionRect.height > 0 &&
        sectionRect.bottom - sectionRect.height < window.innerHeight;
      setIsVisible(isVisible);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkVisibility);
      checkVisibility(); 
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', checkVisibility);
      }
    };
  }, [scrollContainerRef]);

  return (
    <div
      ref={sectionRef}
      className={`flex flex-col h-screen ${isVisible ? 'slideInGrow' : ''}`}
    >
      <div className='flex-grow'>
        <div className='scrollable-content flex flex-col items-center justify-center'>
          <div className='mt-[-130px] bg-none flex items-center justify-center gap-4 section-one w-[70%]'>
            <img
              src={study}
              alt='study'
              className='app-info-image flex-[0.7]'
            />
            <h4 className='bg-none flex-1 text-justify text-gray-300'>
              Navigating academic paths, students often delve into niche
              subjects, from Quantum Mechanics to Byzantine History. This
              specialization, while enriching, can lead to isolation, as finding
              study partners with similar passions is challenging. Traditional
              networks fall short in connecting learners with shared academic
              interests, particularly in less popular fields. Our platform
              addresses this gap, fostering a community where students can unite
              over specific educational interests, enhancing the learning
              experience.
            </h4>
          </div>
          <div className='bg-none flex items-center justify-center gap-4 section-two w-[70%]'>
            <h4 className='bg-none flex-1 text-justify text-gray-300'>
              Collaborative learning offers significant benefits. It introduces
              new perspectives, enhances understanding, and develops critical
              thinking. Our app facilitates this by effortlessly connecting
              students with shared academic interests. It's more than a study
              buddy finder; it's a community builder, making learning connected,
              interactive, and enjoyable. This app transforms solitary study
              into a collaborative, enriching journey.
            </h4>
            <img
              src={teamWork}
              alt='teamwork'
              className='app-info-image flex-[0.7]'
            />
          </div>
        </div>
      </div>

      <div className='contact-section text-center p-4  w-full h-[150px] flex-col'>
        <div className='w-full bg-none mb-5'>
          <hr />
        </div>
        <div className='flex justify-center gap-[140px] bg-none '>
          <div className='about-stubby bg-none flex-col gap-[10px]'>
            <h3 className='bg-none'>Stubby</h3>
            <h5 className='bg-none w-[300px] text-justify text-gray-400'>
              stubby, an app created to facilitate the networking between
              passionate lifelong students, in all subjects and fields
            </h5>
          </div>
          <div className='socials bg-none flex-col gap-[10px]'>
            <h4 className='bg-none'>Socials</h4>
            <div className='flex gap-[30px] bg-none'>
              <a
                href='https://www.linkedin.com/in/tern-folbaek-93a7b8224/'
                className='contact-icon bg-none'
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  size='2x'
                  className='bg-none'
                />
              </a>
              <a
                href='https://github.com/TernFolbaek'
                className='contact-icon bg-none'
              >
                <FontAwesomeIcon
                  icon={faGithub}
                  size='2x'
                  className='bg-none'
                />
              </a>
              <a
                href='mailto:tfolbaek@gmail.com'
                className='contact-icon bg-none'
              >
                <FontAwesomeIcon
                  icon={faEnvelope}
                  size='2x'
                  className='bg-none'
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppInfoSection;
