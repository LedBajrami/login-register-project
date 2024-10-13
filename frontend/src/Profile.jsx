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
        const token = localStorage.getItem('access_token');
    
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',  // Use 'include' if cookies are needed, otherwise use 'same-origin'
        });
    
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
    
        const data = await response.json();
        setUser({
          name: data.name,
          email: data.email,
          profilePhoto: data.profile_photo || null,
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  
    fetchUserData();
  }, [navigate]);

  const handlePhotoUpload = async (file) => {
    const formData = new FormData();
    formData.append('photo', file); // Append the file to form data
  
    try {
      const token = localStorage.getItem('access_token'); // Get the token from local storage
  
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/upload-photo`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: formData, // Use FormData for file uploads
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Update profile photo in the state
        setUser((prevUser) => ({
          ...prevUser,
          profilePhoto: data.path, // Update profile photo URL from the backend response
        }));
  
        console.log('Photo uploaded successfully');
      } else {
        console.error('Failed to upload photo:', data.error);
      }
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  const beforeUpload = (file) => {
    handlePhotoUpload(file);
    return false; // Prevent Ant Design's default upload behavior
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
      beforeUpload={beforeUpload}
      showUploadList={false}
    >
    <button>Upload Photo</button>
</Upload>
      <div>
        <p><Link to="/">Logout</Link></p>
      </div>
    </div>
    
  );
}

export default UserProfile;
