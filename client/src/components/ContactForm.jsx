import React, { useState } from 'react';
import axios from 'axios';
import {toast} from "react-hot-toast";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Show a loading toast (optional)
        const toastId = toast.loading('Sending...');

        try {
            const response = await axios.post('/api/SendMessage', formData);
            if (response.data.success) {
                // Success toast
                toast.success('Message sent successfully!', { id: toastId });
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
            } else {
                // Failure toast
                toast.error('Failed to send the message.', { id: toastId });
            }
        } catch (error) {
            // Error toast
            toast.error('An error occurred while sending the message.', { id: toastId });
        }
    };



    return (
        <section id="contact" className="contact section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="text-center section-heading" data-aos="fade-up">
                    <h1 className="mb-3">Contact</h1>
                    <p>We'd love to hear from you! Please fill out the form below, and we'll get back to you as soon as possible.</p>
                </div>

                <div className="row gy-4">
                    <div className="col-lg-4">
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={300}>
                            <i className="bi bi-geo-alt flex-shrink-0" />
                            <div>
                                <h3>Address</h3>
                                <p>A108 Adam Street, New York, NY 535022</p>
                            </div>
                        </div>
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={400}>
                            <i className="bi bi-telephone flex-shrink-0" />
                            <div>
                                <h3>Call Us</h3>
                                <p>+880 1722 476947</p>
                            </div>
                        </div>
                        <div className="info-item d-flex" data-aos="fade-up" data-aos-delay={500}>
                            <i className="bi bi-envelope flex-shrink-0" />
                            <div>
                                <h3>Email Us</h3>
                                <p>info@example.com</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-8">
                        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay={200}>
                            <div className="row gy-4">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        placeholder="Your Name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder="Your Email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12">
                                    <input
                                        type="text"
                                        name="subject"
                                        className="form-control"
                                        placeholder="Subject"
                                        required
                                        value={formData.subject}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-md-12">
                  <textarea
                      name="message"
                      className="form-control"
                      rows={6}
                      placeholder="Message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                  />
                                </div>
                                <div className="col-md-12 text-center">
                                    <button className="btn-submit" type="submit">
                                        Send Message
                                    </button>
                                </div>
                            </div>
                        </form>
                        {status && <p className="text-center mt-3">{status}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
