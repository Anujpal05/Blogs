import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  userBlogController,
} from "../controller/blogController.js";
import { jwtMiddleware } from "../jwt.js";

const router = express.Router();

//router

//GET || all-blogs
router.route("/all-blog").get(jwtMiddleware, getAllBlogsController);

//POST || create blog
router.route("/create-blog").post(jwtMiddleware, createBlogController);

//PUT || update blog
router.route("/update-blog/:id").put(jwtMiddleware, updateBlogController);

//GET || single blog details
router.route("/get-blog/:id").get(jwtMiddleware, getBlogByIdController);

//DELETE || delete blog
router.route("/delete-blog/:id").delete(jwtMiddleware, deleteBlogController);

router.route("/user-blogs/:id").get(jwtMiddleware, userBlogController);

export default router;
