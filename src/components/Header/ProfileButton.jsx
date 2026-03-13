import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/authSlice';
import { signOutUser } from '../../firebase/auth';
import { LogoutBtn } from '../';
import api from '../../conf/axiosConfig';

function ProfileButton() {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const dropdownRef = useRef(null);

  const isUserLoggedIn = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const handleProfileClick = () => {
    navigate('/profile');
    setShowDropdown(false);
  };

  const handleMyReservationsClick = () => {
    navigate('/myreservations');
    setShowDropdown(false);
  };

  const handleFindSpotClick = () => {
    navigate('/find');
    setShowDropdown(false);
  };

  const handleShareSpotClick = () => {
    navigate(isUserLoggedIn ? '/become-a-host' : '/login');
    setShowDropdown(false);
  };

  const fetchUserDetails = useCallback(async () => {
    if (isUserLoggedIn) {
      try {
        const response = await api.get('/users/me');
        setUserDetails(response.data.data);
      } catch (error) {
        const status = error.response?.status;
        // 401 = token rejected by backend, 404 = user record doesn't exist in DB.
        // Both mean the session is unrecoverable — sign out so the UI is consistent.
        // Anything else (500, network error) is transient; leave the user logged in.
        if (status === 401 || status === 404) {
          await signOutUser();
          dispatch(logout());
        }
      }
    }
  }, [isUserLoggedIn, dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center space-x-2">
        {userDetails.profilePhoto ? (
          <img src={userDetails.profilePhoto} alt="User Avatar" className="h-10 w-10 rounded-full ring-2 ring-primary-color" />
        ) : (
          <div className="h-10 w-10 rounded-full ring-2 ring-primary-color bg-gray-200" />
        )}
      </button>
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-20">
          <button onClick={handleProfileClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-color">
            Profile
          </button>
          <button onClick={handleMyReservationsClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-color">
            My Reservations
          </button>
          <div className="block md:hidden">
            <button onClick={handleFindSpotClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-color">
              Find a Spot
            </button>
            <button onClick={handleShareSpotClick} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary-color">
              Share a Spot
            </button>
          </div>
          <LogoutBtn />
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
