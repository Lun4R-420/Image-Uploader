import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://image-uploader-silk-seven.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

if (process.env.NODE_ENV !== "production") {
    app.listen(3000, () => {
        console.log("Server running on http://localhost:3000");
    });
}

export default app;