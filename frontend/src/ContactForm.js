import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ContactForm.css';

const ContactForm = ({ user }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);
  const serviceRef = useRef(null);
  const [services, setServices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch services from the server
    axios.get('http://localhost:8080/services')
      .then((response) => {
        setServices(response.data || []);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });

    // Fill user's full name and email if available
    if (user) {
      nameRef.current.value = user.name || '';
      emailRef.current.value = user.email || '';
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = nameRef.current.value;
    const email = emailRef.current.value;
    const phone = phoneRef.current.value;
    const message = messageRef.current.value;
    const selectedService = serviceRef.current.value;

    try {
      const response = await axios.post('http://localhost:8080/contactus', {fullName,email,phone,message,serviceId: selectedService,});

      
      alert(response.data.message);

      // nameRef.current.value = '';
      // emailRef.current.value = '';
      phoneRef.current.value = '';
      messageRef.current.value = '';

      // onClose();
      navigate('/');
    } 
    catch (error) {
      console.error('Error submitting contact form:', error);
    }
  };

  const handleClose = () => {
    navigate('/');
  };

  return (
    <div className="contact-form">
      <div className="close-button" onClick={handleClose}>
        X
      </div>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" ref={nameRef} required readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" ref={emailRef} required readOnly />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input type="text" id="phone" ref={phoneRef} />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service</label>
          <select id="service" ref={serviceRef} required>
            <option value="" disabled selected>Select a service</option>
            {services.map((service) => (
              <option key={service.ServiceID} value={service.ServiceID}>
                {service.ServiceName}
              </option>
            ))}
            <option value="others">Others</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" ref={messageRef} required></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ContactForm;

