import React, { useState } from "react";
import { toast } from "react-hot-toast";
import BlogStore from "../../store/blogStore.js";

const CreateBlog = () => {
    const { CreateBlogRequest } = BlogStore();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null,
        author: "",
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
        if (!formData.title || !formData.content || !formData.author) {
            toast.error("Please fill in all required fields.");
            return;
        }

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const result = await CreateBlogRequest(form);
            if (result) {
                toast.success("Blog created successfully!");
                setTimeout(() => {
                    window.location.href = "/dashboard"; // Redirect after success
                }, 2000); // Delay to show the toast message
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create the blog.");
        }
    };



    return (
        <div id="create-blog" className="main-content">
            <div className="card">
                <div className="card-header">
                    <h2>Create a New Blog</h2>
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
                            Publish
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;
