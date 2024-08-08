import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faGooglePlusG, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export default function Anita() {
    return (
        <div className='Anita'>
            <div className="left">
                <h1>Anita Allen</h1>
                <h3>Graphic Designer</h3>
                <p>Meet our talented Graphic Designer, Anita Allen.
                    Anita is a creative visionary with a passion for transforming ideas into visually stunning designs.
                    Her work is a testament to her dedication to crafting compelling visuals that make a lasting impact.</p>
                <div className="range">
                    <div>
                        <div className="eighty">80%</div>
                        <h5>Creativity</h5>
                        <div className="topPercent"></div>
                        <div className="DownPercent"></div>
                    </div>
                    <div>
                        <div className="eighty">80%</div>
                        <h5>Team Work</h5>
                        <div className="topPercent"></div>
                        <div className="DownPercent"></div>
                    </div>
                    <div>
                        <div className="eighty">80%</div>
                        <h5>Designing</h5>
                        <div className="topPercent"></div>
                        <div className="DownPercent"></div>
                    </div>
                </div>
            </div>
            <div className="right">
                <div className="Rleft">
                    <img src={require('../images/anitaMain.png')} alt="" />
                </div>
                <div className="Rright">
                    <h6>She's committed to bringing your ideas to life and elevating your visual identity.
                    </h6>
                    <div className="ibox">
                        <div className="b1">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                        </div>
                        <div className="b1">
                            <a href="https://plus.google.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faGooglePlusG} />
                            </a>
                        </div>
                        <div className="b1">
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faLinkedin} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
