import { create } from "zustand";
import axios from "axios";

const BlogStore = create((set) => ({
    BlogList: [],
    BlogDetails: null,

    // Fetch all blogs
    BlogListRequest: async () => {
        try {
            const res = await axios.get("/api/BlogList");
            if (res.data.status === "success") {
                set({ BlogList: res.data.data });
            }
        } catch (error) {
            console.error("Error fetching blog list:", error);
        }
    },

    // Read specific blog details
    ReadBlogRequest: async (id) => {
        try {
            const res = await axios.get(`/api/ReadBlog/${id}`);
            if (res.data.status === "success") {
                set({ BlogDetails: res.data.data });
                return res.data.data; // Return blog details
            }
        } catch (error) {
            console.error("Error fetching blog details:", error);
            throw error; // Allow error propagation
        }
    },

    // Create a new blog
    CreateBlogRequest: async (formData) => {
        try {
            const res = await axios.post(`/api/CreateBlog`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === "success") {
                return res.data.data;
            }
        } catch (error) {
            console.error("Error creating blog:", error);
            throw error;
        }
    },

    // Edit a blog
    EditPostRequest: async (blogID, formData) => {
        try {
            const res = await axios.post(`/api/UpdateBlog/${blogID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === "success") {
                const updatedBlog = res.data.blog; // Extract the updated blog object
                set((state) => ({
                    BlogList: state.BlogList.map((blog) =>
                        blog._id === blogID ? { ...blog, ...updatedBlog } : blog
                    ),
                }));
                return updatedBlog; // Return updated blog for further use
            }
        } catch (error) {
            console.error("Error editing blog post:", error);
            throw error;
        }
    },

    // Delete a blog
    DeletePostRequest: async (blogID) => {
        try {
            const res = await axios.get(`/api/DeleteBlog/${blogID}`);
            if (res.data.status === "success") {
                set((state) => ({
                    BlogList: state.BlogList.filter((blog) => blog._id !== blogID),
                }));
            }
        } catch (error) {
            console.error("Error deleting blog post:", error);
        }
    },
}));

export default BlogStore;
