import TeamModel from "../models/teamModel.js"; // Import your Team model

// Create or Upsert a team member (Create or Update)
export const saveTeam = async (req, res) => {
    try {
        const { teamID } = req.params; // Optional parameter for update
        const { name, designation, bio } = req.body;

        // Validate required fields
        if (!name || !designation || !bio) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Handle uploaded image
        const image = req.file ? req.file.filename : null;

        if (teamID) {
            // Update existing team member
            const updates = { name, designation, bio };
            if (image) {
                updates.image = image; // Add new image if uploaded
            }

            const updatedTeam = await TeamModel.findByIdAndUpdate(teamID, updates, {
                new: true,
            });

            if (!updatedTeam) {
                return res.status(404).json({ status: "fail", message: "Team member not found" });
            }

            return res
                .status(200)
                .json({ status: "success", message: "Team member updated successfully", member: updatedTeam });
        } else {
            // Create a new team member
            const newTeam = new TeamModel({ name, designation, bio, image });
            await newTeam.save();

            return res
                .status(201)
                .json({ status: "success", message: "Team member created successfully", data: newTeam });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error processing team member",
            error: error.message,
        });
    }
};

// Get a specific team member
export const readTeam = async (req, res) => {
    try {
        const team = await TeamModel.findById(req.params.teamID);
        if (!team) {
            return res.status(404).json({ status: "fail", message: 'Team member not found' });
        }
        res.status(200).json({ status: "success", data: team });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Error fetching team member', error: error.message });
    }
};

// Delete a team member
export const deleteTeam = async (req, res) => {
    try {
        const deletedTeam = await TeamModel.findByIdAndDelete(req.params.teamID);

        if (!deletedTeam) {
            return res.status(404).json({ status: "fail", message: 'Team member not found' });
        }
        res.status(200).json({ status: "success", message: 'Team member deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Error deleting team member', error: error.message });
    }
};

// List all team members
export const teamList = async (req, res) => {
    try {
        const teams = await TeamModel.find().sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            status: "success",
            data: teams,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching team members",
            error: error.message,
        });
    }
};
