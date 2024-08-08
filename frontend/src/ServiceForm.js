// ServiceForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ServiceForm.css';
import { useNavigate } from 'react-router-dom';

const ServiceForm = ({ user }) => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0); // New state for total price
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesResponse = await axios.get('http://localhost:8080/services');
        setServices(servicesResponse.data || []);

        // Fetch user services
        if (user && user.uid) {
          const userServicesResponse = await axios.get(`http://localhost:8080/user/${user.uid}/services`);
          setSelectedServices(userServicesResponse.data.map((service) => service.ServiceID));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const selectedServicesData = services.filter((service) => selectedServices.includes(service.ServiceID));
      const totalPrice = selectedServicesData.reduce((sum, service) => sum + service.Price, 0);
      setTotalPrice(totalPrice);
    };
    calculateTotalPrice();
  }, [selectedServices, services]);

  const handleServiceChange = (serviceId) => {
    const updatedSelectedServices = [...selectedServices];
    if (updatedSelectedServices.includes(serviceId)) {
      updatedSelectedServices.splice(updatedSelectedServices.indexOf(serviceId), 1);
    } else {
      updatedSelectedServices.push(serviceId);
    }
    setSelectedServices(updatedSelectedServices);
  };

  const handleAddService = async () => {
    try {
      const response = await axios.post('http://localhost:8080/user/service', { userId: user.uid, serviceId: selectedServices });
      alert("Cart Updated");
      navigate('/');
    } catch (error) {
      console.error('Error adding user service:', error);
    }
  };

  const handleClose = () => {
    // onClose();
    navigate('/');
  };

  return (
    <div className="service-form-container">
      <div className="close-button" onClick={handleClose}>
        X
      </div>
      <h2>Your Services</h2>
      {loading ? (
        <p>Loading services...</p>
      ) : (
        <>
          <table className="service-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Price</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(services) && services.map((service) => (
                <tr key={service.ServiceID}>
                  <td>{service.ServiceName}</td>
                  <td>{`${service.Price} ${service.Currency}`}</td>
                  <td>
                    <input
                      type="checkbox"
                      id={`service-${service.ServiceID}`}
                      className="service-checkbox"
                      checked={selectedServices.includes(service.ServiceID)}
                      onChange={() => handleServiceChange(service.ServiceID)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total-price">Total Price: {totalPrice} {/* Add currency if needed */}</div>
          <br></br>
          <button type="button" className="service-button" onClick={handleAddService}>
            Update Cart
          </button>
        </>
      )}
    </div>
  );
};

export default ServiceForm;
