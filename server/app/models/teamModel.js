import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
    name: {type: String, required: true, trim: true, },
    designation: { type: String, required: true, trim: true, },
    bio: { type: String, required: true, },
    image: { type: String, required: true,  },// Path to uploaded image
 },
    {
        timestamps: true, versionKey: false,
    }
);
const TeamModel = mongoose.model('teams', TeamSchema);
export default TeamModel;
