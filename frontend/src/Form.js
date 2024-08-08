import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css'; 
import axios from 'axios'; 

function Form({ setShowForm, handleSignIn }) {
  const initialUserData = {  name: '',email: '',pass: '',confirmPassword: '',dob: '',address: '',gender: ''};

  const [userData, setUserData] = useState(initialUserData);
  const [formType, setFormType] = useState('signIn');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formType === 'signUp' && userData.pass !== userData.confirmPassword) {
      alert("Password and Confirm Password don't match");
      return;
    }
    const hasData = Object.values(userData).some((value) => value !== '');
    if (formType === 'signIn' && hasData) {
      try {
        const response = await axios.post('http://localhost:8080/signIn', userData);
        if (response.data.success) {
          handleSignIn(response.data.user);
          navigate('/');
        } 
        else {
          alert(response.data.message);
        }
      } 
      catch (error) {
        alert("Wrong username or password");
      }
    } 
    else if (formType === 'signUp' && hasData && validateForm()) {
      try {
        // Make a POST request to your backend only if it's a sign-up
        const response = await axios.post('http://localhost:8080/addUser', userData);
        alert(response.data.message);
      } 
      catch (error) {
        console.error('Error:', error.message);
        alert('Error signing up. Please try again.');
      }
    } else {
      alert("Please fill in all fields correctly.");
    }
  };
  
  const validateForm = () => {
    return userData.name && userData.email && userData.pass && userData.confirmPassword && userData.dob && userData.address && userData.gender;
  };

  const clearDisplay = () => {
    setUserData(initialUserData);
  }
  const handleClose = () => {
    // onClose();
    navigate('/');
  };

  return (
    <div className="App">
      <div className="form-container">
        <div className="cancel-button" onClick={handleClose}>
          X
        </div>
        <div className="form-switch">
          <span onClick={() => {setFormType('signIn') ; clearDisplay();}}className={formType === 'signIn' ? 'active' : ''}>
            Sign In
          </span>
          <span onClick={() => {setFormType('signUp');clearDisplay();}}className={formType === 'signUp' ? 'active' : ''}>
            Sign Up
          </span>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {formType === 'signUp' && (
            <>
              <input type="text" name="name" placeholder="Full Name" value={userData.name} onChange={handleInputChange}/>
              <input type="text" name="address" placeholder="Address" value={userData.address} onChange={handleInputChange}/>

              <select id="gender" name="gender" value={userData.gender} onChange={handleInputChange}>
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>

              <label htmlFor="dob">Date of Birth</label>
              <input type="date" id="dob" name="dob" value={userData.dob} onChange={handleInputChange}/>
            </>
          )}
          <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleInputChange}/>
          <input type="password" name="pass" placeholder="Password" value={userData.pass} onChange={handleInputChange}/>
          {formType === 'signUp' && (
            <>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={userData.confirmPassword} onChange={handleInputChange}/>
            </>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
