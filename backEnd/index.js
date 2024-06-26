import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoute.js";
import blogRoute from "./routes/blogRoute.js";

const port = process.env.PORT || 3000;

dotenv.config();
const app = express();

//mongodb connection
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoute);

//listen
app.listen(port, () => {
  console.log(`Server Running on port ${port}`);
});
