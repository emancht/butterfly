import { Link } from "react-router-dom";
import ServiceStore from "../store/serviceStore.js";
import Preloader from "./Preloader.jsx";
import React from "react";


// Array of 6 Bootstrap icons
const bootstrapIcons = [
    "bi-code-slash", // Web development
    "bi-brush",      // Graphic Design
    "bi-search",     // SEO
    "bi-laptop",     // IT Support
    "bi-house-door", // Home Services
    "bi-cart",       // E-commerce
];

const Service = () => {
    const ServiceList = ServiceStore((state) => state.ServiceList);

    if (ServiceList === null) {
        return <Preloader />;
    } else {
        return (
            <section id="service" className="service section">
                <div className="container" data-aos="fade-up" data-aos-delay={100}>
                    <div className="text-center section-heading" data-aos="fade-up">
                        <h1 className="mb-3">Our Services</h1>
                    </div>

                    <div className="row our-service">
                        {ServiceList.slice(0, 6).map((item, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <Link to={`/service-details/${item._id}`}>
                                    <div className="card h-100 py-4 px-2 border shadow-sm">
                                        <div className="text-center">
                                            <h5 className="my-1">{item.title}</h5>
                                            <i className={`bi ${bootstrapIcons[index]} text-primary`}
                                               style={{fontSize: "3rem"}}></i>

                                            <p>{item.description}</p>
                                        </div>

                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
};

export default Service;
