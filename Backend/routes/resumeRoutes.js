import express from "express";
import multer from "multer";
import { uploadResume, getAllResumes, getResumeById } from "../controllers/resumeController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Upload a single resume
router.post("/upload", upload.single("resume"), uploadResume);

// Get all resumes
router.get("/", getAllResumes);

// Get resume by ID
router.get("/:id", getResumeById);

export default router;