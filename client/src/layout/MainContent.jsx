import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import BlogStore from "../store/blogStore.js";
import TeamStore from "../store/teamStore.js"; // Import TeamStore
import ServiceStore from "../store/serviceStore.js"; // Import ServiceStore
import Preloader from "../components/Preloader.jsx"; // Preloader component

const MainContent = () => {
    const BlogList = BlogStore((state) => state.BlogList);
    const fetchBlogList = BlogStore((state) => state.BlogListRequest);
    const deleteBlog = BlogStore((state) => state.DeletePostRequest);

    const TeamList = TeamStore((state) => state.TeamList);
    const fetchTeamList = TeamStore((state) => state.TeamListRequest);
    const deleteTeam = TeamStore((state) => state.DeleteTeamRequest);

    const ServiceList = ServiceStore((state) => state.ServiceList);
    const fetchServiceList = ServiceStore((state) => state.ServiceListRequest);
    const deleteService = ServiceStore((state) => state.DeleteServiceRequest);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchBlogList();
                await fetchTeamList();
                await fetchServiceList();
            } catch (error) {
                console.error("Failed to fetch data:", error);
            }
        };

        fetchData();
    }, [fetchBlogList, fetchTeamList, fetchServiceList]);

    const handleEdit = (id, type) => {
        if (type === "blog") {
            navigate(`/updateBlog?edit=${id}`);
        } else if (type === "service") {
            navigate(`/updateService?edit=${id}`);
        } else if (type === "team") {
            navigate(`/updateTeam?edit=${id}`);
        }
    };

    const handleDelete = async (id, type) => {
        if (window.confirm("Are you sure you want to delete this item?")) {
            try {
                if (type === "blog") {
                    await deleteBlog(id);
                    await fetchBlogList();
                } else if (type === "team") {
                    await deleteTeam(id);
                    await fetchTeamList();
                } else if (type === "service") {
                    await deleteService(id);
                    await fetchServiceList();
                }
            } catch (error) {
                console.error(`Failed to delete ${type}:`, error);
            }
        }
    };

    if (!BlogList || !TeamList || !ServiceList) {
        return <Preloader />;
    }

    return (
        <div className="main-content">
            {/* Blog List Section */}
            <div className="card mb-3">
                <div className="table-wrapper">
                    <div className="d-flex justify-content-around align-items-center mb-3">
                        <h4 className="mb-0">All Posts</h4>
                        <h6 className="text-danger mb-2">Total Posts: {BlogList.length}</h6>
                    </div>
                    {BlogList.length === 0 ? (
                        <div className="text-center text-muted">No posts available</div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Post Title</th>
                                <th>Author</th>
                                <th>Created Date</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {BlogList.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <Link to={`/blog-details/${item._id}`}>{item.title}</Link>
                                    </td>
                                    <td>{item.author}</td>
                                    <td>
                                        {new Intl.DateTimeFormat("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric",
                                        }).format(new Date(item.createdAt))}
                                    </td>
                                    <td>
                                        <button
                                            className="btn text-primary"
                                            onClick={() => handleEdit(item._id, "blog")}
                                        >
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                        <button
                                            className="btn text-danger"
                                            onClick={() => handleDelete(item._id, "blog")}
                                        >
                                            <i className="bi bi-trash3"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Service List Section */}
            <div className="card mb-3">
                <div className="table-wrapper">
                    <div className="d-flex justify-content-around align-items-center mb-3">
                        <h4 className="mb-0">Service List</h4>
                        <h6 className="text-danger mb-2">Total Services: {ServiceList.length}</h6>
                    </div>
                    {ServiceList.length === 0 ? (
                        <div className="text-center text-muted">No services available</div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Service Title</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {ServiceList.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>
                                        <button
                                            className="btn text-primary"
                                            onClick={() => handleEdit(item._id, "service")}
                                        >
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                        <button
                                            className="btn text-danger"
                                            onClick={() => handleDelete(item._id, "service")}
                                        >
                                            <i className="bi bi-trash3"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Team List Section */}
            <div className="card mb-3">
                <div className="table-wrapper">
                    <div className="d-flex justify-content-around align-items-center mb-3">
                        <h4 className="mb-0">Team List</h4>
                        <h6 className="text-danger mb-2">Total Members: {TeamList.length}</h6>
                    </div>
                    {TeamList.length === 0 ? (
                        <div className="text-center text-muted">No team members available</div>
                    ) : (
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Team Member</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {TeamList.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>
                                        <button
                                            className="btn text-primary"
                                            onClick={() => handleEdit(item._id, "team")}
                                        >
                                            <i className="bi bi-pencil-square"></i> Edit
                                        </button>
                                        <button
                                            className="btn text-danger"
                                            onClick={() => handleDelete(item._id, "team")}
                                        >
                                            <i className="bi bi-trash3"></i> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MainContent;
