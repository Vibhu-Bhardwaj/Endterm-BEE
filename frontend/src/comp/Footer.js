export default function Footer() {
    return (
        <div className="page6" id = "abcd">
            <div className="footerbox">
                <div className="footbox email">
                    <div>
                        <img src={require('../images/email.png')} alt="" />
                    </div>
                    <div>    
                        <h2>EMAIL</h2>
                        <p>vibhu1869.be21@chiktara.edu.in</p>
                        <p>vibhubhardwaj9867@gmail.com</p>
                    </div>
                </div>
                <div className="footbox call">
                    <div>
                        <img src={require('../images/phone.png')} alt="" />
                    </div>
                    <div>
                        <h2>&nbsp;&nbsp;&nbsp;&nbsp;CALL US</h2>
                        <p> +91 7973782107</p>
                        <p>+123-456-7890</p>
                    </div>
                </div>
                <div className="footbox address">
                    <div>
                        <img src={require('../images/address.png')} alt="" />
                    </div>
                    <div>
                        <h2>ADDRESS</h2>
                        <p> #1030,Rahon Road,Ludhiana</p>
                        <p>India - 141007</p>
                    </div>
                </div>
            </div>
            <h2 className="cpyr"> COPYRIGHTS 2023 | Designed by Vibhu</h2>
        </div>
    );
}