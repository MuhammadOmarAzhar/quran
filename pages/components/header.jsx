import {faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import {useState, useEffect} from 'react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check the user's preference from local storage or other sources.
    const isDarkModePreferred = localStorage.getItem('isDarkMode');
    setIsDarkMode(isDarkModePreferred === 'true');
  }, []);

  useEffect(() => {
    // Update the class on the `body` element to enable or disable dark mode.
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    // Save the user's preference in local storage.
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className='bg-white dark:bg-gray-800 py-4 px-4'>
      <div className='container mx-auto flex justify-between items-center'>
        {/* Your Name on the left */}
        <h1 className='text-lg font-bold hidden md:block text-black dark:text-white'>
          Quran
        </h1>
        <div className='gap-4 flex'>
          <button
            onClick={toggleDarkMode}
            className='bg-gray-200 hover:bg-gray-500 text-white font-semibold w-fit py-1 px-2 rounded-full'
          >
            <FontAwesomeIcon
              icon={faCircleHalfStroke}
              style={{color: '#2f3031'}}
            />
            {/* {isDarkMode ? 'Light Mode' : 'Dark Mode'} */}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
