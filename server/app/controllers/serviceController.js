import ServiceModel from '../models/serviceModel.js';

// Create or Upsert a service (Create or Update)
export const saveService = async (req, res) => {
  try {
    const { serviceID } = req.params; // Optional parameter for update
    const { title, description, price } = req.body;

    // Validate required fields
    if (!title || !description || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const image = req.file ? req.file.filename : null; // Handle uploaded image

    if (serviceID) {
      // Update existing service
      const updates = { title, description, price };
      if (image) {
        updates.image = image;
      }

      const updatedService = await ServiceModel.findByIdAndUpdate(
        serviceID,
        updates,
        {
          new: true,
        }
      );

      if (!updatedService) {
        return res
          .status(404)
          .json({ status: 'fail', message: 'Service not found' });
      }

      return res
        .status(200)
        .json({
          status: 'success',
          message: 'Service updated successfully',
          service: updatedService,
        });
    } else {
      // Create a new service
      const newService = new ServiceModel({ title, description, price, image });
      await newService.save();

      return res
        .status(201)
        .json({
          status: 'success',
          message: 'Service created successfully',
          data: newService,
        });
    }
  } catch (error) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Error processing service',
        error: error.message,
      });
  }
};

// Get a specific service
export const readService = async (req, res) => {
  try {
    const service = await ServiceModel.findById(req.params.serviceID);
    if (!service) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Service not found' });
    }
    res.status(200).json({ status: 'success', data: service });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Error fetching service',
        error: error.message,
      });
  }
};

// Delete a service
export const deleteService = async (req, res) => {
  try {
    const deletedService = await ServiceModel.findByIdAndDelete(
      req.params.serviceID
    );

    if (!deletedService) {
      return res
        .status(404)
        .json({ status: 'fail', message: 'Service not found' });
    }
    res
      .status(200)
      .json({ status: 'success', message: 'Service deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({
        status: 'error',
        message: 'Error deleting service',
        error: error.message,
      });
  }
};

// List all services
export const serviceList = async (req, res) => {
  try {
    const services = await ServiceModel.find().sort({ createdAt: -1 }); // Sort by newest first

    res.status(200).json({
      status: 'success',
      data: services,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error fetching services',
      error: error.message,
    });
  }
};
