import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
const UserModel = mongoose.model('users', DataSchema);

export default UserModel;
