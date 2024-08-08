import {useNavigate } from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
    return (
        <div className="main">
            <h1>Simply the Best</h1>
            <h3>Reason for Choosing Us</h3>
            <p>
                Choosing us means choosing a partner that is committed to your success and
                ensuring transparency throughout your digital marketing journey.
                Your business deserves nothing less than the best.
            </p>
            <button className='ReadMore' onClick={() => navigate('/New')}>Read More</button>
        </div>
    );
}