import React, { useState } from 'react';
import TeamStore from '../../store/teamStore.js'; // Import TeamStore
import { useNavigate } from 'react-router-dom'; // Import for navigation
import { toast } from 'react-hot-toast'; // Import toast for notifications

const CreateTeamMember = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const { CreateTeamRequest } = TeamStore(state => state);

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Create a FormData object to handle file upload
        const formData = new FormData();
        formData.append('name', name);
        formData.append('designation', designation);
        formData.append('bio', bio);
        if (image) formData.append('image', image);

        try {
            const data = await CreateTeamRequest(formData);
            if (data) {
                toast.success('Team member created successfully!'); // Success toast
                navigate('/dashboard'); // Redirect to the team page
            }
        } catch (error) {
            console.error('Error creating team member:', error);
            toast.error('Failed to create team member.'); // Error toast
        }
    };

    return (
        <div id="create-team-member" className="main-content">
            <div className="card">
                <div className="card-header bg-background text-white">
                    <h2>Create a New Team Member</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                placeholder="Enter team member's name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Designation</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                className="form-control"
                                placeholder="Enter role/designation"
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="bio" className="form-label">Bio</label>
                            <textarea
                                id="bio"
                                name="bio"
                                className="form-control"
                                placeholder="Enter bio"
                                rows="5"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                required
                            ></textarea>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => setImage(e.target.files[0])}
                            />
                        </div>

                        <button type="submit" className="btn-submit">Publish</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTeamMember;
