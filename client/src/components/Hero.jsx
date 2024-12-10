import {Link} from "react-router-dom";
import HeroImg from "../assets/image/hero-img.png"

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="container py-5">
                <div className="row gy-4">
                    <div
                        className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-md-start">
                        <h2>CREATING WEBSITES THAT MAKE YOU STOP &amp; STARE</h2>
                        <p>We are team of talented designers making websites with Bootstrap</p>
                        <div className="d-flex mt-4 justify-content-center justify-content-md-start">
                            <Link to="/about" className="btn btn-dark">Get Started</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 order-1 order-lg-2 hero-img">
                        <img src={HeroImg} className="img-fluid animated" alt=""/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;