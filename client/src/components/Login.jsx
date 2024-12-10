import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { toast } from "react-hot-toast";  // Import toast for notifications
import UserStore from "../store/userStore.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Initialize useNavigate
    const login = UserStore((state) => state.LoginRequest);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const success = await login(email, password);
            if (success) {
                toast.success("Login successful!");  // Show success toast
                setEmail("");  // Clear email field
                setPassword("");  // Clear password field
                navigate("/dashboard");  // Redirect to dashboard
            } else {
                toast.error("Invalid email or password. Please try again.");  // Show error toast
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="admin-login" className="login section">
            <div className="container">
                <div className="row mt-4">
                    <div className="col-lg-4 col-md-6 col-8 mx-auto">
                        <div className="card shadow-sm">
                            <div className="card-header bg-action text-white mb-3">
                                <h2 className="text-center text-uppercase">Login</h2>
                            </div>
                            <div className="card-body">
                                <form className="py-4 px-3" onSubmit={handleSubmit}>
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
                                        {loading ? "Logging in..." : "Login"}
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

export default Login;
