import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../assets/image/team/team-1.jpg";
import UserStore from "../store/userStore";

const Sidebar = () => {
    const navigate = useNavigate();
    const { LogoutRequest } = UserStore();

    const handleLogout = async () => {
        const success = await LogoutRequest();
        if (success) {
            navigate("/login");
        } else {
            alert("Logout failed. Please try again.");
        }
    };



    return (
        <section id="sidebar" className="sidebar fixed-top">
            <div className="h-100 d-flex flex-column p-3">
                <div className="mb-3">
                    <Link to="/dashboard">
                        <h3>Dashboard</h3>
                    </Link>
                </div>
                <ul className="nav nav-pills flex-column mb-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="nav-link text-white">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/blog" className="nav-link text-white">
                            Our Blog
                        </Link>
                    </li>
                    <li>
                        <Link to="/service" className="nav-link text-white">
                            Our Services
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="nav-link text-white">
                            Contact Us
                        </Link>
                    </li>
                </ul>
                <hr />
                <div className="dropdown">
                    <a
                        href="#"
                        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                        data-bs-toggle="dropdown"
                    >
                        <img src={Profile} alt="User" className="avatar me-2" />
                        <strong>User</strong>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-dark">
                        <li>
                            <Link to="/createBlog" className="dropdown-item">
                                Create Blog
                            </Link>
                        </li>

                        <li>
                            <Link to="/createService" className="dropdown-item">
                                Create Service
                            </Link>
                        </li>
                        <li>
                            <Link to="/createTeam" className="dropdown-item">
                                Create Team Member
                            </Link>
                        </li>
                        <li>
                            <hr className="dropdown-divider" />
                        </li>
                        <li>
                            <Button className="dropdown-item" onClick={handleLogout}>
                                Logout
                            </Button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Sidebar;
