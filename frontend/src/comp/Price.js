import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Price() {
    return (
        <div className='Price'>
            <div className="leftp">
                <div className="PBOX">
                    <h1>Professional</h1>
                    <h2>Website Design</h2>
                    <h3>$<span>49</span>.99</h3>
                    <h5>Overview</h5>
                    <p>Welcome to our Professional Website Design service!
                        We understand the importance of user-friendly website for your business.
                        Our expert team is here to provide you high-quality web design at an affordable price.
                    </p>
                </div>
            </div>
            <div className="rightp">
                <div className="PBOX2">
                    <h1>Our Best</h1>
                    <h2>Feature</h2>
                    <ul>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;Cutting-Edge Technology</li>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;User-Centric Design</li>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;Security First</li>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;Reliable Performance</li>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;Scalable Solutions</li>
                        <li><FontAwesomeIcon icon={faCheck} style={{ color: '#ffffff' }} />&nbsp;&nbsp;Cost-Effective</li>
                    </ul>
                </div>
                <div className="txt">
                    <h1>
                        Take your Website <br /> to the next level
                    </h1>
                    <h2>Are you ready to propel your online presence to new heights?
                        We're dedicated to helping you achieve unparalleled success in the digital realm.</h2>
                    <h2>
                        Our team is committed to providing you with the tools and expertise you need to stand out in the digital landscape.
                        We offer custom design solutions that are as unique as your brand
                        and responsive layouts that ensure your website looks and functions flawlessly on any device.
                    </h2>
                </div>
            </div>
        </div>
    );
}