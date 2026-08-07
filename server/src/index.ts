import express from "express";
import userRoutes from "./routes/users.js";
import uploadRoutes from "./routes/upload.js";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3000;
const users = [
    {id: 1, name: "Ade"}
];

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);

app.use("/upload", uploadRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(400).json({
        message: err.message
    });
});