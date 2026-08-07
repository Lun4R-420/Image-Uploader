import { Router } from "express";
import multer from "multer";
import { images } from "../data/images.js";
import type { UploadedImage } from "../types/image.js";
import path from "path";

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];
const router = Router();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PNG, JPEG, and GIF files are allowed."));
        }
    }
});

router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
    }

    const image: UploadedImage = {
        id: images.length + 1,
        filename: req.file.filename,
        url: `http://localhost:3000/uploads/${req.file.filename}`,
        uploadedAt: new Date()
    };
    images.push(image);
    res.json(image);
});

router.get("/", (req, res) => {
    res.json(images);
});

router.get("/download/:filename", (req, res) => {
    const filename  = req.params.filename;
    const image = images.find(img => img.filename === filename);
    if (!image) {
        return res.status(404).json({ error: "Image not found" });
    }
    res.download(path.join("uploads", filename));
});

export default router;