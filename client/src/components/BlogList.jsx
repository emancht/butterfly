import React from "react";
import { Link } from "react-router-dom";
import BlogStore from "../store/blogStore.js";
import Preloader from "./Preloader.jsx";

const BlogList = () => {
    const BlogList = BlogStore((state) => state.BlogList);

    // Date formatter function
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(date);
    };

    // Function to limit content to 30 words
    const truncateContent = (content) => {
        const words = content.split(" ");
        return words.length > 30
            ? words.slice(0, 30).join(" ") + "..."
            : content;
    };

    if (BlogList === null) {
        return <Preloader />;
    } else {
        return (
            <div id="blog-list" className="blog-list">
                <div className="container py-5">
                    <div className="row g-4">
                        {BlogList.slice(0, 9).map((item, index) => (
                            <div key={index} className="col-lg-4 col-md-6 mb-4">
                                <div className="card h-100 p-3">

                                    <img
                                        src={item.image ? item.image : "https://picsum.photos/id/1018/1000/600/"}
                                        alt={item.title || "Blog Post Image"}
                                        className="img-fluid"
                                    />

                                    <div className="post-entry-1-contents">
                                        <h4 className="my-1">{item.title}</h4>
                                        <span className="meta d-inline-block mb-3">
                                            {formatDate(item.createdAt)}
                                        </span>
                                        <span className="mx-2">by</span>
                                        <span className="text-danger">{item.author}</span>
                                        <p>{truncateContent(item.content)}</p>
                                        <Link className="btn-submit" to={`/blog-details/${item._id}`}>Read more</Link>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default BlogList;
