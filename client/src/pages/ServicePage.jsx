import React, {useEffect} from 'react';
import Service from "../components/Service.jsx";
import Layout from "../layout/Layout.jsx";
import ServiceStore from "../store/serviceStore.js";

const ServicePage = () => {
    const ServiceListRequest = ServiceStore((state) => state.ServiceListRequest);

    useEffect(() => {
        (async ()=>{
            await ServiceListRequest();
        })()
    }, [ServiceListRequest]);

    return (
        <Layout>
            <Service/>
        </Layout>
    );
};

export default ServicePage;