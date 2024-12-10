import React, { useEffect } from "react";
import {Link, useParams} from "react-router-dom";
import BlogStore from "../store/blogStore.js"; // Import the Zustand store
import Preloader from "./Preloader.jsx";

const BlogDetails = () => {
    const BlogList = BlogStore((state) => state.BlogList); // Access the list of blogs from the store
    const { id } = useParams(); // Extract `id` from the URL
    const blog = BlogStore((state) => state.BlogDetails); // Access blog details from the store
    const fetchBlogDetails = BlogStore((state) => state.ReadBlogRequest); // Fetch function



    useEffect(() => {
        fetchBlogDetails(id); // Fetch blog details when the component loads
    }, [id, fetchBlogDetails]);

    // Format date in a user-friendly format
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    // Display a loader if blog details are not yet fetched
    if (!blog) {
        return <Preloader />;
    }

    return (
        <div id="blog-details" className="blog-details section">
            <div className="container">
                {/* Blog Title */}
                <div className="text-center section-heading" data-aos="fade-up">
                    <h2 className="mb-3 text-uppercase">{blog.title || "No Title"}</h2>
                </div>
                <div className="row">
                    {/* Blog Content */}
                    <div className="col-md-8">
                        <div className="card">
                            <img
                                src={blog.image || "https://picsum.photos/id/1018/1000/600/"}
                                alt={blog.title || "Blog Post Image"}
                                className="img-fluid"
                            />
                            <div className="card-body">
                                <span className="meta d-inline-block mb-3">
                                    {formatDate(blog.createdAt)}
                                </span>
                                <span className="mx-2">by</span>
                                <span className="text-danger">{blog.author || "Unknown"}</span>
                                <p className="lead">{blog.content || "No content available."}</p>
                            </div>

                        </div>


                    </div>

                    {/* Other Posts Section */}
                    <div className="col-md-4">


                        <div className="card p-3 bg-light">
                            <h4 className="text-center"> Other Posts</h4>

                            <h6 className="text-danger mb-2">Total Post: {BlogList.length}</h6>
                            <hr/>
                            {BlogList.length > 0 ? (
                                BlogList.map((item, index) => (
                                    <div key={index} className="row mb-3">

                                        <div className="border-bottom py-1">
                                            <Link to={`/blog-details/${item._id}`}>{item.title}</Link>

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <p className="text-center">No other posts available.</p>
                            )}
                            <div className="mb-1"><Link to="/" className="nav-link" href="#">Back To Homepage</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetails;
