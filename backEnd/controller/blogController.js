import mongoose from "mongoose";
import blogModel from "../models/blogModel.js";
import userModel from "../models/userModel.js";

//get all blogs
export const getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");

    if (!blogs) {
      return res.status(200).send({
        success: false,
        message: "No Blogs Found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "All Blogs listed!",
      blogCount: blogs.length,
      blogs,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while getting blogs!",
      error,
    });
  }
};

//create new blog
export const createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields!",
      });
    }

    const existingUser = await userModel.findById(user);

    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: "Unable to find user!",
      });
    }

    const newBlog = new blogModel({
      title,
      description,
      image,
      user,
    });

    const session = await mongoose.startSession();
    await session.startTransaction();
    await newBlog.save({ session });
    await existingUser.blogs.push(newBlog);
    await existingUser.save({ session });
    await session.commitTransaction();
    await newBlog.save();

    return res.status(200).send({
      success: true,
      message: "New blog created successfully!",
      newBlog,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while creating blog!",
      error,
    });
  }
};

//update blog
export const updateBlogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );

    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "Blog is not found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Blog updated!",
      blog,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while updating blog!",
      error,
    });
  }
};

//Get user all blogs
export const userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate("blogs");
    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: "blogs not found by this id!",
      });
    }
    const length = userBlog.blogs.length;
    if (length === 0) {
      return res.status(200).send({
        success: false,
        message: "No Any Blog is created!",
        length: userBlog.blogs.length,
      });
    }
    return res.status(200).send({
      success: true,
      message: "user blogs found!",
      userBlog,
      length: userBlog.blogs.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while finding user's blogs!",
    });
  }
};

//get single blog
export const getBlogByIdController = async (req, res) => {
  try {
    const blog = await blogModel.findById(req.params.id).populate("user");

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: "Blog is not found!",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Getting single blog!",
      blog,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: "Error while getting single blog!",
    });
  }
};

//delete blog controller
export const deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel
      .findByIdAndDelete(req.params.id)
      .populate("user");
    console.log(blog.user.blogs);

    if (!blog) {
      return res.status(400).send({
        success: false,
        message: "Blog is not found!",
      });
    }
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      success: true,
      message: "Blog is deleted!",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while deleting blog!",
      error,
    });
  }
};
