export default function About() {
    return (
        <div className='about'>
            <img src={require('../images/A.png')} alt="A" />
            <div className="p1">
                <h1>We are <br /> Creative Agency</h1>
                <p>
                    <b> We are not just a creative agency, we are your partner in success. Our passion for creativity knows no bounds.
                        We excel in bringing unique ideas to life and delivering design and marketing solutions that captivate your audience.
                        Our commitment to client-focused approach sets us apart in the industry.
                    </b> With a dedicated team of experts, we turn your vision into reality in the digital world.
                    Join us in creating extraordinary experiences.Let's make your creative dreams a reality.
                </p>
            </div>
            <div className="p2">
                <div className="colon">"</div>
                <p className="quote"> Our dedication to innovation is your formula for transformative results.
                    Our commitment to innovation and expertise is unparalleled.
                    We deliver results that matter, with a focus on precision and client satisfaction.
                    With a dedicated team and cutting-edge solutions, we are here to guide your digital journey towards excellence.
                    Join us in reaching new heights.
                </p>
                <h1 className="name">Anita&nbsp; Allen</h1>
            </div>
        </div>
    );
}