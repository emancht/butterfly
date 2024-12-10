import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import ServiceStore from "../../store/serviceStore.js"; // Adjust to your store's path

const UpdateService = () => {
    const { ReadServiceRequest, CreateServiceRequest, EditServiceRequest } = ServiceStore();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editServiceID = queryParams.get("edit");

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        image: null, // No preloaded image
    });

    // Preload service data if editServiceID exists
    useEffect(() => {
        if (editServiceID) {
            ReadServiceRequest(editServiceID).then((service) => {
                if (service) {
                    setFormData({
                        title: service.title,
                        description: service.description,
                        price: service.price,
                        image: null, // Images are not preloaded
                    });
                } else {
                    toast.error("Service not found!");
                }
            });
        }
    }, [editServiceID, ReadServiceRequest]);

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

        const serviceForm = new FormData();
        for (let key in formData) {
            serviceForm.append(key, formData[key]);
        }

        try {
            if (editServiceID) {
                // Update existing service
                const updatedService = await EditServiceRequest(editServiceID, serviceForm);
                toast.success("Service updated successfully!");
                console.log("Updated Service:", updatedService); // Optional debug log
            } else {
                // Create a new service
                const createdService = await CreateServiceRequest(serviceForm);
                toast.success("Service created successfully!");
                console.log("Created Service:", createdService); // Optional debug log
            }

            // Redirect after success
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 2000);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to process the request. Please try again."
            );
        }
    };

    return (
        <div id="update-service" className="main-content">
            <div className="card">
                <div className="card-header">
                    <h2>{editServiceID ? "Edit Service" : "Create a New Service"}</h2>
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
                            {editServiceID ? "Update Service" : "Create Service"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateService;
