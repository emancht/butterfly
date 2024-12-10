import { Link } from "react-router-dom";
import React from "react";
import BlogStore from "../store/blogStore.js";
import Preloader from "./Preloader.jsx";
import NoData from "./NoData.jsx";

const Blog = () => {
    const BlogList = BlogStore((state) => state.BlogList);

    // Date formatter
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
        return words.length > 50
            ? words.slice(0, 50).join(" ") + "..."
            : content;
    };

    if (BlogList === null) {
        return <Preloader />;
    }

    return (
        <section id="blog" className="blog section">
            <div className="container" data-aos="fade-up" data-aos-delay={100}>
                <div className="text-center section-heading" data-aos="fade-up">
                    <h1 className="mb-3">Our Blog</h1>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo assumenda, dolorum
                        necessitatibus eius earum voluptates sed!
                    </p>
                </div>

                {BlogList.length === 0 ? (
                   <NoData/>
                ) : (
                    <div className="row">
                        {BlogList.map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-6 mb-4">
                                <div className="card h-100 bg-transparent p-4">
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
                )}
            </div>
        </section>
    );
};

export default Blog;
