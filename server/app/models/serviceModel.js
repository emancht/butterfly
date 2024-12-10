import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, },
    description: { type: String, required: true, },
    price: { type: String, required: true, },
    image: { type: String, required: false, },
  },
  {
    timestamps: true, versionKey: false,
  }
);
const ServiceModel = mongoose.model('Service', ServiceSchema);

export default ServiceModel;
