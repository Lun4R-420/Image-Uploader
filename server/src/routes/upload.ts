import { Router } from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import { images } from "../data/images.js";
import type { UploadedImage } from "../types/image.js";

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

const router = Router();

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        public_id: (req, file) => `${Date.now()}-${file.originalname}`,
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (allowedFileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only PNG, JPEG, and GIF files are allowed."));
        }
    },
});

router.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded",
        });
    }

    const image: UploadedImage = {
        id: images.length + 1,
        filename: req.file.filename,
        url: req.file.path,
        uploadedAt: new Date(),
    };

    images.push(image);

    res.json(image);
});

router.get("/", (req, res) => {
    res.json(images);
});

export default router;