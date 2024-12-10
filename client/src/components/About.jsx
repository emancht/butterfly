import React from "react";
import TeamStore from "../store/teamStore.js";
import Preloader from "./Preloader.jsx";
import AboutImg from "../assets/image/services.jpg"; // Adjust path as necessary

const About = () => {
    const TeamList = TeamStore((state) => state.TeamList);

    if (TeamList === null) {
        return <Preloader />;
    }

    return (
        <section id="about" className="about section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="text-center section-heading" data-aos="fade-up">
                    <h1 className="mb-3">About Us</h1>
                    <p>
                        Welcome to Innovatech Solutions, where creativity meets technology. At Innovatech, we don't just follow trends; we set them. Our agency is dedicated to providing cutting-edge IT solutions that blend innovation with practicality, ensuring your business not only stays current but thrives in an ever-evolving digital landscape
                    </p>

                </div>
            </div>
            <div className="about-body py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5">
                            <h3>Our Vision</h3>
                            <p>Our vision is to revolutionize the way businesses interact with technology. We believe
                                that the best solutions are those that are tailor-made, integrating seamlessly into your
                                workflow while providing unparalleled efficiency and user experience.</p>
                            <h3>What We Do</h3>
                            <ul>
                                <li><strong>Web Development:</strong> Our team of expert developers crafts stunning, responsive websites
                                    that serve as a powerful tool for your brand’s digital presence.
                                </li>
                                <li> <strong>Mobile App Development:</strong> We create intuitive and engaging mobile applications that
                                    keep your audience connected and engaged on the go.
                                </li>
                                <li> <strong>Digital Marketing:</strong> From SEO to social media management, we ensure your brand reaches
                                    its target audience and makes a lasting impact.
                                </li>
                                <li><strong>IT Consulting:</strong> Our consultants provide strategic guidance to help you navigate the
                                    complex world of technology and make informed decisions.
                                </li>
                                <li></li>
                                <li> <strong>UI/UX Design:</strong> We design user interfaces and experiences that are not only visually
                                    appealing but also highly functional and user-centric.
                                </li>
                            </ul>
                            <h3>Our Approach</h3>
                            <p> At Innovatech, we believe in a client-centric approach. We take the time to understand
                                your unique needs and challenges, working collaboratively to develop solutions that
                                drive results. Our process is transparent, and our team is dedicated to delivering
                                projects on time and within budget.</p>
                        </div>
                        <div className="col-md-6 ms-auto">
                            <div className="card">
                                <img src={AboutImg} className="img-fluid" alt="About"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team Section */}
            <div className="our-team py-3">
                <div className="container">
                    <div className="row justify-content-center text-center mb-5 section-heading">
                        <div className="col-md-6">
                            <h3 className="scissors text-center">Meet Our Team</h3>
                            <p className="mb-5 lead">
                                Our team is a diverse group of passionate professionals, each bringing a wealth of experience and expertise to the table. We are designers, developers, marketers, and strategists who share a common goal: to help your business succeed.
                            </p>
                        </div>
                    </div>
                    <div className="row ">
                        {Array.isArray(TeamList) &&
                            TeamList.slice(0, 3).map((item, index) => (
                                <div key={item.id || index} className="col-lg-4 col-md-6 mb-5">
                                    <div className="card h-100">
                                        <div className="text-center">
                                            <img
                                                src={item.image || "https://picsum.photos/id/1018/1000/600/"}
                                                alt={item.name || "Team Member"}
                                                className="rounded-circle w-25"
                                            />
                                        </div>
                                        <div className="card-body text-center">
                                            <span className="meta">{item.role}</span>
                                            <h4>{item.name}</h4>
                                            <span className="fst-normal">{item.bio}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
