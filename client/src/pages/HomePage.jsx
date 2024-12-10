import React, { useEffect } from "react";
import Layout from "../layout/Layout.jsx";
import Hero from "../components/Hero.jsx";
import BlogList from "../components/BlogList.jsx";
import BlogStore from "../store/blogStore.js";

const HomePage = () => {
    const BlogListRequest = BlogStore((state) => state.BlogListRequest);

    useEffect(() => {
        (async () => {
            await BlogListRequest();
        })();
    }, [BlogListRequest]);

    return (
        <Layout>
            <Hero />
            <BlogList />
        </Layout>
    );
};

export default HomePage;
