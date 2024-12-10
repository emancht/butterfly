import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceStore from "../store/serviceStore.js"; // Import the Zustand store for services
import Preloader from "./Preloader.jsx";

const ServiceDetails = () => {
    const ServiceList = ServiceStore((state) => state.ServiceList); // Access the list of services from the store
    const { id } = useParams(); // Extract `id` from the URL
    const service = ServiceStore((state) => state.ServiceDetails); // Access service details from the store
    const fetchServiceDetails = ServiceStore((state) => state.ReadServiceRequest); // Fetch function

    useEffect(() => {
        fetchServiceDetails(id); // Fetch service details when the component loads
    }, [id, fetchServiceDetails]);

    // Format currency for price
    const formatCurrency = (price) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(price);
    };

    // Display a loader if service details are not yet fetched
    if (!service) {
        return <Preloader />;
    }

    return (
        <div id="service-details" className="service-details section">
            <div className="container">
                {/* Service Title */}
                <div className="text-center section-heading" data-aos="fade-up">
                    <h2 className="mb-3 text-uppercase">{service.title || "No Title"}</h2>
                </div>
                <div className="row">
                    {/* Service Content */}
                    <div className="col-md-8">
                        <div className="card">
                            <img
                                src={service.image}
                                alt={service.title || "Service Image"}
                                className="img-fluid"
                            />
                            <div className="card-body">
                                <p className="lead">{service.description || "No description available."}</p>
                                <h5 className="text-primary">
                                    Price: {service.price ? formatCurrency(service.price) : "Not available"}
                                </h5>
                            </div>
                        </div>
                    </div>

                    {/* Other Services Section */}
                    <div className="col-md-4">
                        <div className="card p-3 bg-light">
                            <h4 className="text-center"> Other Services</h4>

                            <h6 className="text-danger mb-2">Total Services: {ServiceList.length}</h6>
                            <hr />
                            {ServiceList.length > 0 ? (
                                ServiceList.map((item, index) => (
                                    <div key={index} className="row mb-3">
                                        <div className="border-bottom py-1">
                                            <Link to={`/service-details/${item._id}`}>{item.title}</Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No other services available.</p>
                            )}
                            <div className="mb-1">
                                <Link to="/" className="nav-link" href="#">
                                    Back To Homepage
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetails;
