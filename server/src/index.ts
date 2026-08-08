import "dotenv/config";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";

const app = express();

app.use(cors({
    origin: "https://image-uploader-silk-seven.vercel.app"
}));

app.use(express.json());

app.use("/users", userRoutes);
app.use("/upload", uploadRoutes);

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;