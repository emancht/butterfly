import React from 'react';
import {Link} from "react-router-dom";
import logo from "../assets/image/logo.png"

const Header = () => {
    return (
        <section id="header" className="header">
            <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top box-shadow">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Brand"/>
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item mx-3">
                                <Link className="nav-link " aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="/blog">Our Blog</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="/service">Our Services</Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" to="/contact">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </section>
    );
};

export default Header;