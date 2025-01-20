import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";
dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

//mongodb connection
connectDB();

//middlewares
app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoute);

//listen
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
