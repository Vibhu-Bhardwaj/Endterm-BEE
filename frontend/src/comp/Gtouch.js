import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faFacebookF, 
  faGooglePlusG, 
  faYoutube, 
  faLinkedin, 
  faDigg, 
  faTwitter, 
  faWhatsapp 
} from '@fortawesome/free-brands-svg-icons';

export default function Gtouch() {
    return (
        <div className="gTouch">
            <div className="t">GetinTouch</div>
            <div className="page5">
                <div className="page5box">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faFacebookF} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faGooglePlusG} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faYoutube} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faLinkedin} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://www.digg.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faDigg} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faTwitter} className="fa-xl" />
                    </a>
                </div>
                <div className="page5box">
                    <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <FontAwesomeIcon icon={faWhatsapp} className="fa-xl" />
                    </a>
                </div>
            </div>
        </div>
    );
}
