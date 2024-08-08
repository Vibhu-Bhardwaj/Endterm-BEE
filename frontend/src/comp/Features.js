import {useNavigate } from 'react-router-dom';

export default function Features() {
    const navigate = useNavigate()
    return (
        <div className="Features">
            <div className="Fbox">    
                <h1>Amazing features</h1>
                <p><b>Embrace our cutting-edge solutions for a dynamic online presence.
                    Our exceptional features include advanced analytics, responsive design, e-commerce integration, and expert SEO strategies.
                    Your digital success is our priority.
                    Our digital triumph is our mission.Let us elevate you to extraordinary accomplishments and
                    allow us to propel you to extraordinary heights.</b></p>
                <button onClick={() => navigate('/New')}>Read More</button>
            </div>
        </div>

    );
}