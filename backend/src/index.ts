import express from 'express';
import userRoutes from "./routes/AuthRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes)

app.listen(5000, () => {
    console.log("Server is running on port 5000")
});