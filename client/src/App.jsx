import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import {Toaster} from "react-hot-toast";
import BlogDetails from "./components/BlogDetails.jsx";

import ServicePage from "./pages/ServicePage.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import CreateBlog from "./components/blog/CreateBlog.jsx";
import UpdateBlog from "./components/blog/UpdateBlog.jsx";
import CreateService from "./components/service/CreateService.jsx";
import CreateTeamMember from "./components/team/CreateTeamMember.jsx";
import UpdateTeamMember from "./components/team/UpdateTeamMember.jsx";
import UpdateService from "./components/service/UpdateService.jsx";
import ServiceDetails from "./components/ServiceDetails.jsx";



const App = () => {
    return (
        <BrowserRouter>
            <Toaster
                position="bottom-center"
                reverseOrder={false}
            />
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/contact" element={<ContactPage/>}/>
                <Route path="/blog" element={<BlogPage/>}/>
                <Route path="/blog-details/:id" element={<BlogDetails/>} />
                <Route path="/service-details/:id" element={<ServiceDetails/>} />
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/service" element={<ServicePage/>}/>
                {/*  CRUD Operation  */}
                <Route path="/register" element={<RegisterPage/>}/>
                <Route path="/login" element={<LoginPage/>}/>


                <Route path="/dashboard" element={<DashBoard/>}/>

                <Route path="/createBlog" element={<CreateBlog/>}/>
                <Route path="/updateBlog" element={<UpdateBlog/>}/>

                <Route path="/createService" element={<CreateService/>}/>
                <Route path="/updateService" element={<UpdateService/>}/>

                <Route path="/createTeam" element={<CreateTeamMember/>}/>
                <Route path="/updateTeam" element={<UpdateTeamMember/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;