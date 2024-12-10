import React, {useEffect} from "react";
import BlogStore from "../store/blogStore.js";
import MainContent from "../layout/MainContent.jsx";
import Sidebar from "../layout/Sidebar.jsx";  // Adjust path as necessary

const DashBoard = () => {
    const BlogListRequest = BlogStore((state) => state.BlogListRequest);

    useEffect(() => {
        (async () => {
            await BlogListRequest();
        })();
    }, [BlogListRequest]);

    return (
        <>
            <Sidebar/>
            <MainContent/>
        </>
    );
};

export default DashBoard;
