import React, {useEffect} from 'react';
import Blog from "../components/Blog.jsx";
import Layout from "../layout/Layout.jsx";
import BlogStore from "../store/blogStore.js";

const BlogPage = () => {

    const BlogListRequest = BlogStore((state) => state.BlogListRequest);

    useEffect(() => {
        (async () => {
            await BlogListRequest();
        })();
    }, [BlogListRequest]);
    return (
        <Layout>
            <Blog/>
        </Layout>
    );
};

export default BlogPage;