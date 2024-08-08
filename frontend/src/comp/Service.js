export default function Service() {
    return (
        <div className="service">
            <div className="Sbox">
                <div className="one">
                    <h1>Services <br />We Provide</h1>
                    <p><strong>Our services are designed to elevate your online presence, engage your target audience,
                        and drive your business toward success. </strong></p>
                    <p> Our team of experts is dedicated to delivering these services with excellence, 
                        ensuring your business's growth and success in the digital age.
                        Contact us today to explore how our services can benefit your business.
                    </p>
                </div>
                <div className="two">
                    <img src={require('../images/line.png')} className="horizontal" alt="img" />
                    <img src={require('../images/l2.png')} className="l1" alt="img" />
                    <img src={require('../images/l2.png')} className="l2" alt="img" />
                    <div className="SSbox">
                        <img src={require('../images/s1.png')} alt="" />
                        <h5>Logo & <br /> Branding</h5>
                    </div>
                    <div className="SSbox">
                        <img src={require('../images/s2.png')} alt="" />
                        <h5>Social Media <br /> Branding</h5>
                    </div>
                    <div className="SSbox">
                        <img src={require('../images/s3.png')} alt="" />
                        <h5>Digital <br /> Products</h5>
                    </div>
                    <div className="SSbox">
                        <img src={require('../images/s4.png')} alt="" />
                        <h5>Logo & <br /> Branding</h5>
                    </div>
                    <div className="SSbox">
                        <img src={require('../images/s5.png')} alt="" />
                        <h5>Email <br/>Automation </h5>
                    </div>
                    <div className="SSbox">
                        <img src={require('../images/s6.png')} alt="" />
                        <h5>Mobile <br /> & Web</h5>
                    </div>
                </div>
            </div>
        </div>

    );
}