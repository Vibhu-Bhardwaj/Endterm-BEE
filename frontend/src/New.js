import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './New.css';

export default function New() {
    const [services, setServices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/services2')
            .then((response) => {
                setServices(response.data || []);
            })
            .catch((error) => {
                console.error('Error fetching services:', error);
            });
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : services.length - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex < services.length - 1 ? prevIndex + 1 : 0));
    };

    const handleClose = () => {
        navigate('/');
      };

    return (
        <div className="service-container">
            <div className="close-button" onClick={handleClose}>
                X
            </div>
            <h2>Our Services</h2>
            {services.length > 0 && (
                <div className="service-section">
                    <h3>{services[currentIndex].ServiceName}</h3>
                    <p>{services[currentIndex].Description}</p>
                    <p>Starting Price: {services[currentIndex].Price} {services[currentIndex].Currency}</p>
                </div>
            )}

            <div className="carousel-controls">  
                <button onClick={handlePrev}>&lt; Prev</button>
                <button onClick={handleNext}>Next &gt;</button>
            </div>
        </div>
    );
}
