import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navigateToDashboard = () => {
    navigate('/');
  };

  return (
    <div className="header w-full bg-[#a3d6a3] text-2xl text-green-700 border mb-4 flex flex-col sm:flex-row justify-between items-center">
      <div className={`p-4 ${isSmallScreen ? 'w-full' : 'w-auto'} flex items-center justify-center ${isSmallScreen && 'mb-4'}`}>
        <input
          type="text"
          placeholder="Search..."
          className="border rounded-md p-2"
        />
        <FontAwesomeIcon icon={faSearch} className="ml-2" />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center">
        {/* <NavLink to="/">
          <button className="bg-green-700 text-green-200 py-1 px-4 rounded-3xl text-lg mr-4 mb-2 sm:mb-0">
            Back to Dashboard
          </button>
        </NavLink> */}

        {/* <h1 className="text-center p-2 font-bold">SRC_YOUR RELIABLE RIDE ANYTIME, ANYWHERE!</h1> */}

        
      </div>
    </div>
  );
}

export default Header;
