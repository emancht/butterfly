import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import TeamStore from "../../store/teamStore.js";

const UpdateTeamMember = () => {
    const { ReadTeamRequest, EditTeamRequest } = TeamStore(); // Use Read and Edit requests from the store
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const editTeamID = queryParams.get("edit");

    const [formData, setFormData] = useState({
        name: "",
        designation: "",
        bio: "",
        image: null, // No preloaded image
    });

    // Preload team member data if editTeamID exists
    useEffect(() => {
        if (editTeamID) {
            ReadTeamRequest(editTeamID).then((teamMember) => {
                if (teamMember) {
                    setFormData({
                        name: teamMember.name,
                        designation: teamMember.designation,
                        bio: teamMember.bio,
                        image: null, // Images are not preloaded
                    });
                } else {
                    toast.error("Team member not found!");
                }
            });
        }
    }, [editTeamID, ReadTeamRequest]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();
        for (let key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const updatedTeamMember = await EditTeamRequest(editTeamID, form);
            toast.success("Team member updated successfully!");
            console.log("Updated Team Member:", updatedTeamMember);

            // Redirect after successful update
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update the team member. Please try again."
            );
        }
    };

    return (
        <div id="update-team-member" className="main-content">
            <div className="card">
                <div className="card-header">
                    <h2>{editTeamID ? "Edit Team Member" : "Create Team Member"}</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter team member's name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="designation" className="form-label">
                                Designation
                            </label>
                            <input
                                type="text"
                                id="designation"
                                name="designation"
                                className="form-control"
                                placeholder="Enter designation"
                                value={formData.designation}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">
                                Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                placeholder="Write a short bio"
                                rows="5"
                                value={formData.bio}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">
                                Image
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </div>

                        <button type="submit" className="btn-submit">
                            {editTeamID ? "Update Team Member" : "Create Team Member"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTeamMember;
