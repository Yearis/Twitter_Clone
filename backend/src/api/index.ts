import express from 'express';
import userRoutes from "../routes/AuthRoutes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", userRoutes)

app.get("/", (req, res) => {
    res.status(200).send("Backend is running");
});

export default app;