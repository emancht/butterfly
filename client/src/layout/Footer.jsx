import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer id="footer" className="footer border-top">
            <div className="container footer-top ">
                <div className="row gy-4">
                    <div className="col-lg-5 col-md-12 footer-about">
                        <Link to="/" className="logo d-flex align-items-center">
                            <span className="sitename text-secondary-emphasis">Butterfly</span>
                        </Link>
                        <p>
                            Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada
                            terra videa magna derita valies darta donna mare fermentum iaculis eu
                            non diam phasellus.
                        </p>
                        <div className="social-links d-flex mt-4">
                            <a href="">
                                <i className="bi bi-twitter-x"/>
                            </a>
                            <a href="">
                                <i className="bi bi-facebook"/>
                            </a>
                            <a href="">
                                <i className="bi bi-instagram"/>
                            </a>
                            <a href="">
                                <i className="bi bi-linkedin"/>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Useful Links</h4>
                        <ul>
                            <li>
                                <a href="#">Home</a>
                            </li>
                            <li>
                                <a href="#">About us</a>
                            </li>
                            <li>
                                <a href="#">Services</a>
                            </li>
                            <li>
                                <a href="#">Terms of service</a>
                            </li>
                            <li>
                                <a href="#">Privacy policy</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-2 col-6 footer-links">
                        <h4>Our Services</h4>
                        <ul>
                            <li>
                                <a href="#">Web Design</a>
                            </li>
                            <li>
                                <a href="#">Web Development</a>
                            </li>
                            <li>
                                <a href="#">Product Management</a>
                            </li>
                            <li>
                                <a href="#">Marketing</a>
                            </li>
                            <li>
                                <a href="#">Graphic Design</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                        <h4>Contact Us</h4>
                        <p>A108 Adam Street</p>
                        <p>New York, NY 535022</p>
                        <p>United States</p>
                        <p className="mt-4">
                            <strong>Phone:</strong> <span>+1 5589 55488 55</span>
                        </p>
                        <p>
                            <strong>Email:</strong> <span>info@example.com</span>
                        </p>
                    </div>
                </div>
            </div>
            <div className="container copyright text-center mt-4 border-top">
                <p>
                    &copy; <span>Copyright</span>{" "}
                    <strong className="px-1 sitename">Butterfly</strong>{" "}
                    <span>All Rights Reserved</span>
                </p>

            </div>
        </footer>


    );
};

export default Footer;