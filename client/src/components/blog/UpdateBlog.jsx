import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast"; // Assuming you're using react-hot-toast for notifications
import BlogStore from "../../store/blogStore.js";

const UpdateBlog = () => {
    const { ReadBlogRequest, EditPostRequest } = BlogStore();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const editBlogID = queryParams.get("edit");

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        author: "",
        image: null, // No preloaded image
    });

    // Preload blog data if editBlogID exists
    useEffect(() => {
        if (editBlogID) {
            ReadBlogRequest(editBlogID).then((blog) => {
                if (blog) {
                    setFormData({
                        title: blog.title,
                        content: blog.content,
                        author: blog.author,
                        image: null, // Images are not preloaded
                    });
                } else {
                    toast.error("Blog not found!");
                }
            });
        }
    }, [editBlogID, ReadBlogRequest]);

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
        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const updatedBlog = await EditPostRequest(editBlogID, form);
            toast.success("Blog updated successfully!");
            console.log("Updated Blog:", updatedBlog); // Optional debug log

            // Redirect after successful update
            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 2000);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update the blog. Please try again."
            );
        }
    };


    return (
        <div id="update-blog" className="main-content">
            <div className="card">
                <div className="card-header">
                    <h2>Edit Blog</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">
                                Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                placeholder="Enter the blog title"
                                value={formData.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">
                                Content
                            </label>
                            <textarea
                                id="content"
                                name="content"
                                className="form-control"
                                placeholder="Write your blog content here..."
                                rows="5"
                                value={formData.content}
                                onChange={handleInputChange}
                                required
                            ></textarea>
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

                        <div className="mb-3">
                            <label htmlFor="author" className="form-label">
                                Author
                            </label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                className="form-control"
                                placeholder="Enter Author's Name"
                                value={formData.author}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            Update Blog
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;
