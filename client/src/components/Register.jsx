import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { toast } from "react-hot-toast";  // Import toast for notifications
import UserStore from "../store/userStore.js";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate
    const register = UserStore((state) => state.RegisterRequest);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const success = await register(email, password);
            if (success) {
                toast.success("Registration successful! You can now log in.");  // Show success toast
                setEmail("");
                setPassword("");
                setTimeout(() => {
                    navigate("/login");  // Redirect to login page after successful registration
                }, 2000);  // Delay the redirect slightly for the user to see the toast
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="register" className="register section">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-6 col-md-8 col-8 mx-auto">
                        <div className="card">
                            <div className="card-header bg-action text-white mb-3">
                                <h2 className="text-center">Create An Account</h2>
                            </div>
                            <div className="card-body">
                                <form className="p-4" onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Registering..." : "Register"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
