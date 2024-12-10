import React, { useState } from "react";
import { toast } from "react-hot-toast";
import ServiceStore from "../../store/serviceStore.js"; // Adjust to your store's path

const CreateService = () => {
    const { CreateServiceRequest } = ServiceStore(); // Use the ServiceStore for creating a service

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if required fields are empty
        if (!formData.title || !formData.description || !formData.price) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const serviceForm = new FormData();
        for (let key in formData) {
            serviceForm.append(key, formData[key]);
        }

        try {
            const result = await CreateServiceRequest(serviceForm);
            if (result) {
                toast.success("Service created successfully!");
                setTimeout(() => {
                    window.location.href = "/dashboard"; // Redirect after success
                }, 2000); // Delay to show the toast message
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create the service.");
        }
    };

    return (
        <div id="create-service" className="main-content">
            <div className="card">
                <div className="card-header bg-background text-white">
                    <h2>Create a New Service</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Service Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Enter the service title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">
                                Service Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                placeholder="Write service description..."
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="price" className="form-label">
                                Service Price
                            </label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="form-control"
                                placeholder="Enter service price"
                                value={formData.price}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Feature Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateService;
