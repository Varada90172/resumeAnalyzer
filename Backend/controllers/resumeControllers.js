import db from "../db/index.js";
import pdfParse from "pdf-parse";
import { analyzeResume } from "../services/analysisService.js";

// Upload resume
export const uploadResume = async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  let analysis;
  try {
    analysis = await analyzeResume(req.file.buffer);
  } catch (err) {
    console.warn("❌ Gemini failed, using fallback:", err.message);

    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;

    const nameMatch = text.match(/^[A-Z][a-z]+\s[A-Z][a-z]+/);
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i);
    const phoneMatch = text.match(/\b\d{10}\b/);

    analysis = {
      name: nameMatch ? nameMatch[0] : null,
      email: emailMatch ? emailMatch[0] : null,
      phone: phoneMatch ? phoneMatch[0] : null,
      linkedin_url: null,
      portfolio_url: null,
      summary: text.slice(0, 500),
      work_experience: [],
      education: [],
      technical_skills: [],
      soft_skills: [],
      projects: [],
      certifications: [],
      resume_rating: null,
      improvement_areas: "",
      upskill_suggestions: [],
    };
  }

  const query = `
    INSERT INTO resumes (
      file_name, name, email, phone, linkedin_url, portfolio_url, summary,
      work_experience, education, technical_skills, soft_skills,
      resume_rating, improvement_areas, upskill_suggestions
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const params = [
    req.file.originalname,
    analysis.name,
    analysis.email,
    analysis.phone,
    analysis.linkedin_url,
    analysis.portfolio_url,
    analysis.summary,
    JSON.stringify(analysis.work_experience),
    JSON.stringify(analysis.education),
    JSON.stringify(analysis.technical_skills),
    JSON.stringify(analysis.soft_skills),
    analysis.resume_rating,
    analysis.improvement_areas,
    JSON.stringify(analysis.upskill_suggestions),
  ];

  db.run(query, params, function (err) {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to save resume" });
    }
    res.json({ id: this.lastID, ...analysis });
  });
};

// Get all resumes
export const getAllResumes = (req, res) => {
  db.all("SELECT * FROM resumes ORDER BY uploaded_at DESC", [], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch resumes" });
    }
    res.json(rows);
  });
};

// Get resume by ID
export const getResumeById = (req, res) => {
  db.get("SELECT * FROM resumes WHERE id = ?", [req.params.id], (err, row) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch resume" });
    }
    if (!row) return res.status(404).json({ error: "Resume not found" });
    res.json(row);
  });
};