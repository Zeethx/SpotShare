import React, { useState, useEffect, useRef } from "react";
import api from "../../conf/axiosConfig";

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const fileInput = useRef();

  useEffect(() => {
    api.get('/users/me')
      .then(response => {
        setUser(response.data.data);
        console.log('User data:', response.data.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
    api.get('/users/parking-spaces')
      .then(response => {
        console.log('Parking spaces:', response.data.data);
      })
  }, []);

  const handleProfilePictureSubmit = (event) => {
    event.preventDefault();
    const file = fileInput.current.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('profilePhoto', file);

      console.log('Uploading file:', file);

      api.post('/users/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(response => {
          setUser(response.data.data);
          console.log('Updated user data:', response.data.data);
        })
        .catch(error => {
          console.error('Error updating profile picture:', error.response ? error.response.data : error.message);
        });
    } else {
      console.error('No file selected');
    }
  };

  const handleProfilePictureClick = () => {
    fileInput.current.click();
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl w-full">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-32 h-32 bg-gray-300 rounded-full overflow-hidden cursor-pointer" onClick={handleProfilePictureClick}>
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-2xl text-gray-600">Name: {user.fullName} </h1>
            <p className="text-2xl text-gray-600">Email: {user.email}</p>
            <p className="text-2xl text-gray-600">Phone Number: {user.phoneNumber}</p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Parking History</h2>
          <div className="bg-gray-100 p-6 rounded-lg h-64 overflow-y-auto">
            <p className="text-gray-600">No parking history available.</p>
          </div>
        </div>
        <form onSubmit={handleProfilePictureSubmit} className="hidden">
          <input
            type="file"
            ref={fileInput}
            onChange={handleProfilePictureSubmit}
            className="hidden"
          />
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
