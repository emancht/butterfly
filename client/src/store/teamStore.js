import { create } from "zustand";
import axios from "axios";

const TeamStore = create((set) => ({
    TeamList: [],
    TeamDetails: null,

    // Fetch all team members
    TeamListRequest: async () => {
        try {
            const res = await axios.get("/api/TeamList");
            if (res.data.status === "success") {
                set({ TeamList: res.data.data });
            }
        } catch (error) {
            console.error("Error fetching team list:", error);
        }
    },

    // Read specific team member details
    ReadTeamRequest: async (id) => {
        try {
            const res = await axios.get(`/api/ReadTeam/${id}`);
            if (res.data.status === "success") {
                set({ TeamDetails: res.data.data });
                return res.data.data; // Return team details
            }
        } catch (error) {
            console.error("Error fetching team details:", error);
            throw error; // Allow error propagation
        }
    },

    // Create a new team member
    CreateTeamRequest: async (formData) => {
        try {
            const res = await axios.post(`/api/CreateTeam`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === "success") {
                return res.data.data;
            }
        } catch (error) {
            console.error("Error creating team member:", error);
            throw error;
        }
    },

    // Edit a team member
    EditTeamRequest: async (teamID, formData) => {
        try {
            const res = await axios.post(`/api/UpdateTeam/${teamID}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if (res.data.status === "success") {
                const updatedTeamMember = res.data.team; // Extract the updated team member object
                set((state) => ({
                    TeamList: state.TeamList.map((member) =>
                        member._id === teamID ? { ...member, ...updatedTeamMember } : member
                    ),
                }));
                return updatedTeamMember; // Return updated team member for further use
            }
        } catch (error) {
            console.error("Error editing team member:", error);
            throw error;
        }
    },

    // Delete a team member
    DeleteTeamRequest: async (teamID) => {
        try {
            const res = await axios.get(`/api/DeleteTeam/${teamID}`);
            if (res.data.status === "success") {
                set((state) => ({
                    TeamList: state.TeamList.filter((member) => member._id !== teamID),
                }));
            }
        } catch (error) {
            console.error("Error deleting team member:", error);
        }
    },
}));

export default TeamStore;
