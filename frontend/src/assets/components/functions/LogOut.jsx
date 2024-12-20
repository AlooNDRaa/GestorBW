import React from 'react';
import { auth } from '../../../credentials/firebaseConfig';
import { signOut } from 'firebase/auth';

export default function LogOut({ setIsAuthenticated }) {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      sessionStorage.removeItem('userName');
      setIsAuthenticated(false); 
      window.location.href = '/'; 
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <button className="log-out" onClick={handleLogOut}>
      Log out
    </button>
  );
}
