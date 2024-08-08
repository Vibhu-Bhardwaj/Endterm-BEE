export default function Team() {
    return (
        <div className="team" id = "team">
            <h1>We are Perfect Team</h1>
            <p>We believe that a perfect team is the cornerstone of successful digital marketing. 
                Our team is a dynamic blend of creative minds, technical experts, and strategic thinkers, 
                all working together to help your business thrive in the digital landscape.
                We are committed to making your digital marketing journey a successful one. </p>
            <div className="teamBox">
                <div className="Tbox">
                    <img src={require('../images/jeefleft.png')} alt="" />
                    <h2>Jeff Norton</h2>
                    <h5>Graphic Designer</h5>
                </div>
                <div className="Tbox">
                    <img src={require('../images/anita0.png')} alt="" />
                    <h2>Anita Allen</h2>
                    <h5>Graphic Designer</h5>
                </div>
                <div className="Tbox">
                    <img src={require('../images/jeff0.png')} alt="" />
                    <h2>Jeff Norton</h2>
                    <h5>Graphic Designer</h5>
                </div>
                <div className="Tbox">
                    <img src={require('../images/anita.png')} alt="" />
                    <h2>Anita Allen</h2>
                    <h5>Graphic Designer</h5>
                </div>
                <div className="Tbox extra">
                    <img src={require('../images/jeff.png')} alt="" />
                    <h2>Jeff Norton</h2>
                    <h5>Graphic Designer</h5>
                </div>
            </div>
        </div>
    );
}