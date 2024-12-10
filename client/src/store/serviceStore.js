import { create } from "zustand";
import axios from "axios";

const ServiceStore = create((set) => ({
    ServiceList: [],
    ServiceDetails: null,

    // Fetch all services
    ServiceListRequest: async () => {
        try {
            const res = await axios.get("/api/ServiceList");
            if (res.data.status === 'success') {
                set({ ServiceList: res.data.data });
            }
        } catch (error) {
            console.error("Error fetching Service list:", error);
        }
    },

    // Read specific service details
    ReadServiceRequest: async (id) => {
        try {
            const res = await axios.get(`/api/ReadService/${id}`);
            if (res.data.status === 'success') {
                set({ ServiceDetails: res.data.data });
                return res.data.data; // Return service details
            }
        } catch (error) {
            console.error("Error fetching service details:", error);
            throw error; // Allow error propagation
        }
    },

    // Create a new service
    CreateServiceRequest: async (formData) => {
        try {
            const res = await axios.post(`/api/CreateService`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === 'success') {
                return res.data.data;
            }
        } catch (error) {
            console.error("Error creating service:", error);
            throw error;
        }
    },

// Edit a service
    EditServiceRequest: async (serviceID, formData) => {
        try {
            const res = await axios.post(`/api/UpdateService/${serviceID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === "success") {
                const updatedService = res.data.service; // Extract the updated service object
                set((state) => ({
                    ServiceList: state.ServiceList.map((service) =>
                        service._id === serviceID ? { ...service, ...updatedService } : service
                    ),
                }));
                return updatedService; // Return updated service for further use
            }
        } catch (error) {
            console.error("Error editing service:", error);
            throw error;
        }
    },



    // Delete a service
    DeleteServiceRequest: async (serviceID) => {
        try {
            const res = await axios.get(`/api/DeleteService/${serviceID}`);
            if (res.data.status === 'success') {
                set((state) => ({
                    ServiceList: state.ServiceList.filter((service) => service._id !== serviceID),
                }));
            }
        } catch (error) {
            console.error("Error deleting service:", error);
        }
    },
}));

export default ServiceStore;
