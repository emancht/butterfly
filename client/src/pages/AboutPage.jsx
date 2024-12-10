import React, { useEffect } from "react";
import About from "../components/About.jsx";
import Layout from "../layout/Layout.jsx";
import TeamStore from "../store/teamStore.js";

const AboutPage = () => {
    const TeamListRequest = TeamStore((state) => state.TeamListRequest);

    useEffect(() => {
        (async () => {
            await TeamListRequest();
        })();
    }, [TeamListRequest]);

    return (
        <Layout>
            <About />
        </Layout>
    );
};

export default AboutPage;
