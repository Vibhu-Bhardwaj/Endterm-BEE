// UpdateProfileForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './updateProfileForm.css';
import { useNavigate } from 'react-router-dom';

function UpdateProfileForm({ user , handleSignIn}) {
  const [updatedUserData, setUpdatedUserData] = useState({
    name: user.name,
    email: user.email,
    gender: user.gender,
    address: user.Address,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/updateUser/${user.uid}`, updatedUserData);
      if (response.data.success) {
        alert(response.data.message);
        handleSignIn(response.data.user);
        navigate('/');
      } 
    } 
    catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };
  const handleClose = () => {
    navigate('/');
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        const response = await axios.delete(`http://localhost:8080/deleteUser/${user.uid}`);
        if (response.data.success) {
          alert(response.data.message);
          handleSignIn(null);
          navigate('/');
        }
      } catch (error) {
        console.error('Error deleting account:', error.message);
      }
    }
  };
  
  return (
    <form className="update-profile-form" onSubmit={handleUpdate}>
      <div className="close-button" onClick={handleClose}>
        X
      </div><br></br>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" value={updatedUserData.name} onChange={handleInputChange} />

      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" value={updatedUserData.email} onChange={handleInputChange} />

      <label htmlFor="gender">Gender</label>
      <select id="gender" name="gender" value={updatedUserData.gender} onChange={handleInputChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="address">Address</label>
      <input type="text" id="address" name="address" value={updatedUserData.address} onChange={handleInputChange} />

      <button type="submit" className='update-button'>Update Profile</button>
      <div> <button type="button" className='delete-button' onClick={handleDeleteAccount}>Delete Account</button> </div>
      
    </form>
  );
}

export default UpdateProfileForm;
