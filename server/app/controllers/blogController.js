
import BlogModel from "../models/blogModel.js";



// Create or Upsert a blog post (Create or Update)
export const saveBlog = async (req, res) => {
    try {
        const { blogID } = req.params; // Optional parameter for update
        const { title, content, author } = req.body;

        // Validate required fields
        if (!title || !content || !author) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const image = req.file ? req.file.filename : null; // Handle uploaded image

        if (blogID) {
            // Update existing blog
            const updates = { title, content, author };
            if (image) {
                updates.image = image;
            }

            const updatedBlog = await BlogModel.findByIdAndUpdate(blogID, updates, {
                new: true,
            });

            if (!updatedBlog) {
                return res.status(404).json({ status: "fail", message: "Blog not found" });
            }

            return res
                .status(200)
                .json({ status: "success", message: "Blog updated successfully", blog: updatedBlog });
        } else {
            // Create a new blog
            const newBlog = new BlogModel({ title, content, author, image });
            await newBlog.save();

            return res
                .status(201)
                .json({ status: "success", message: "Blog created successfully", data: newBlog });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Error processing blog", error: error.message });
    }
};


// Get a specific blog post
export const readBlog = async (req, res) => {
    try {
        const blog = await BlogModel.findById(req.params.blogID);
        if (!blog) {
            return res.status(404).json({ status: "fail", message: 'Blog not found' });
        }
        res.status(200).json({ status: "success", data: blog });
    } catch (error) {
        res.status(500).json({  status: "error", message: 'Error fetching blog', error: error.message });
    }
};



// Delete a blog post
export const deleteBlog = async (req, res) => {
    try {
        const deletedBlog = await BlogModel.findByIdAndDelete(req.params.blogID);

        if (!deletedBlog) {
            return res.status(404).json({ status: "fail", message: 'Blog not found' });
        }
        res.status(200).json({ status: "success", message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ status: "error", message: 'Error deleting blog', error: error.message });
    }
};

// List all blog posts
export const blogList = async (req, res) => {
    try {
        const blogs = await BlogModel.find().sort({ createdAt: -1 }); // Sort by newest first

        res.status(200).json({
            status: "success",
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: "Error fetching blogs",
            error: error.message,
        });
    }
};
