import pdfParse from "pdf-parse";
import { GoogleGenerativeAI } from "@google/generative-ai";

const client = new GoogleGenerativeAI({ apiKey: process.env.GOOGLE_API_KEY });

/**
 * Extract text from PDF buffer
 */
export async function extractTextFromPDF(fileBuffer) {
  try {
    const data = await pdfParse(fileBuffer);
    return data.text;
  } catch (err) {
    console.error("❌ PDF parsing failed:", err);
    return "";
  }
}

/**
 * Parse resume text using Gemini LLM (latest SDK)
 */
export async function parseResume(resumeText) {
  try {
    const prompt = `
You are an expert technical recruiter and career coach. Extract the following resume into
a valid JSON object. All fields must be present. Do not include any other text or markdown.

Resume Text:
"""
${resumeText}
"""

JSON Structure:
{
  "name": "string | null",
  "email": "string | null",
  "phone": "string | null",
  "linkedin_url": "string | null",
  "portfolio_url": "string | null",
  "summary": "string | null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions": ["string"]
}
`;

    // Use latest SDK
    const response = await client.responses.create({
      model: "gemini-1.5-turbo", // or gemini-1.5-flash
      input: prompt,
    });

    // Extract model output
    const textOutput = response.output_text;

    const parsed = JSON.parse(textOutput);
    return parsed;

  } catch (err) {
    console.error("❌ Gemini parsing failed, using fallback:", err);
    // Fallback: minimal parsed data from raw text
    return {
      name: null,
      email: null,
      phone: null,
      linkedin_url: null,
      portfolio_url: null,
      summary: resumeText.slice(0, 500),
      work_experience: [],
      education: [],
      technical_skills: [],
      soft_skills: [],
      resume_rating: null,
      improvement_areas: "",
      upskill_suggestions: [],
    };
  }
}

/**
 * Main function: extract PDF text and parse
 */
export async function analyzeResume(fileBuffer) {
  const text = await extractTextFromPDF(fileBuffer);
  const parsedData = await parseResume(text);
  return parsedData;
}