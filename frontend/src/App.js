import React, { useState , useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Link, Route, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footer from './comp/Footer';
import Price from './comp/Price';
import Gtouch from './comp/Gtouch';
import Anita from './comp/Anita';
import Team from './comp/Team';
import Service from './comp/Service';  
import Features from './comp/Features';
import About from './comp/About';
import Header from './comp/Header';
import Main from './comp/Heading';
import Form from './Form';
import ContactForm from './ContactForm';
import ServiceForm from './ServiceForm';
import UpdateProfileForm from './UpdateProfileForm'; 
import { Link as Scroll } from 'react-scroll';
import New from './New';
import axios from 'axios';


function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/checkAuth') .then(response => {
        const {success,message,user} = response.data;
        console.log(response.data);
        if (success) {
          setUser(user);
        }
      })
      .catch(error => {
        console.error('Error checking authentication:', error);
      });
  }, []);

  // const navigate = useNavigate();

  const handleSignIn = (userData) => {
    setUser(userData);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  return (
    <div className="wrapper">
      <div className="top">
        <div className="container nav">
          {user ? (<h1 className='glow'> Hi {user.name}</h1>) : (<div className="logo"><img src={require('./images/digital.png')} alt="Logo" /></div>)}
          <div className="list">
            <nav className="navbar navbar-expand-lg navbar-light list">
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation"> 
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                  <li className="nav-item"><Link to="/">Home</Link></li>
                  <li className="nav-item"><Link to="/Features">Features</Link></li>
                  <li className="nav-item"><Link to="/Facts">Facts</Link></li>
                  {user ? (<li className="nav-item"> <Link to="/Services" >Services</Link></li>) : (<li className="nav-item"><Scroll to="Price">Pricing</Scroll></li>)}
                  {user ? (<li className="nav-item"> <Link to="Contact">Contact Us</Link></li>) : (<></>)}
                  {user ? (<li className="nav-item"> <Link to="/UpdateProfile">Profile</Link></li>) : (<li className="nav-item"><Link to="/Join">Join</Link></li>)}
                  {user ? (<li className="nav-item" onClick={handleSignOut}><a>Logout</a> </li>) : (<></>)}
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route exact path="/New" element={<New/>} />
          <Route exact path="/Features" element={<Header />} />
          <Route exact path="/Facts" element={<About />} />
          <Route exact path="/Contact" element={user ? (<ContactForm user={user} />) : (<Main/>)} />
          <Route exact path="/Join" element={<Form handleSignIn={handleSignIn} />} />
          <Route exact path="/UpdateProfile" element={<UpdateProfileForm user={user} handleSignIn={handleSignIn} />} />
          <Route exact path="/Services" element={<ServiceForm user={user} />} />
        </Routes>
      </div>

      <div className="linker"></div>

      <Features />
      <Service />
      <Team />
      <Anita />
      <Price id="Price" />
      <Gtouch />
      <Footer />
    </div>
  );
}

export default App;
