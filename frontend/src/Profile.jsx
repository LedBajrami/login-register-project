import React, { useState, useEffect } from 'react';
import { Upload } from 'antd';
import { Link, useNavigate } from 'react-router-dom';


function UserProfile() {
  const [user, setUser] = useState({
    name: '', 
    email: '', 
    profilePhoto: null,
  });

  const navigate = useNavigate()

  useEffect(() => {
   const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`)
      const data = await response.json()
      console.log(data)
      if (response.ok) {
       
        setUser({
          name: data.name,
          email: data.email,
          profilePhoto: data.profilePhoto || null
        })
        console.log(data.name)
      } else {
        navigate("/")
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
   }

   fetchUserData()
  }, [navigate]);

  const handlePhotoUpload = () => {
    // logic to handle photo uploads
  };

  return (
    <div style={{ width: '400px', marginInline: 'auto', paddingTop: '50px' }}>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong> {user.name} 
      </div>
      <div>
        <strong>Email:</strong> {user.email}
      </div>

      <div>
        <strong>Profile Photo:</strong>
        {user.profilePhoto ? (
          <img src={user.profilePhoto} alt="Profile" style={{ width: '100%' }} />
        ) : (
          <img src="path/to/default/photo.jpg" alt="Default Profile" style={{ width: '100%' }} />
        )}
      </div>

      <Upload
        name="profile_photo"
        action=""// upload photo endpoint, still not created
        onChange={handlePhotoUpload}
        showUploadList={false}
      >
        <button>
          Upload Photo
        </button>
      </Upload>
      <div>
        <p><Link to="/">Logout</Link></p>
      </div>
    </div>
    
  );
}

export default UserProfile;
