// src/components/LogoutButton.jsx
import React from 'react';
// import { useHistory } from 'react-router-dom';

const LogoutButton = () => {
  // const history = useHistory();

  const handleLogout = async () => {
    try {  
      const response = await fetch('https://safety-drive-connect-backend-project-2.onrender.com/api/v1/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // Clear user data from client-side storage
        localStorage.removeItem('token');
        // Redirect to login page
        history.push('/login');
      } else {
        console.error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout', error);
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
