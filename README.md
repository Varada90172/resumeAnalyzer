Resume Analyzer

📌 Overview

The Resume Analyzer is a full-stack web application that allows users to upload resumes (PDF), automatically extracts key information, stores it in a database, and provides AI-powered feedback for improvement.

It has two main features:

1. Resume Analysis: Upload a resume → Extract structured data → Analyze with Gemini LLM → Display rating, improvement areas, and upskilling suggestions.


2. Historical Viewer: View all previously uploaded resumes in a table → Open details in a modal → Reuse the same analysis view.




---

🛠 Tech Stack

Frontend: React.js

Backend: Node.js, Express.js

Database: PostgreSQL

PDF Parsing: pdf-parse

LLM Integration: Google Gemini API (@google/generative-ai)

Others: multer, dotenv, axios, cors



---

⚙ Architecture & Flow

1. User uploads a resume (PDF).


2. Backend extracts text using pdf-parse.


3. Text is passed to Gemini LLM with a prompt to generate structured JSON.


4. Data is stored in PostgreSQL (JSONB columns for flexible nested data).


5. Frontend displays the results in a structured UI.


6. Past resumes can be fetched and viewed in a history tab.




---

🗄 Database Design

A single table resumes stores:

Basic info (name, email, phone, links)

Summary, skills, work experience, education, projects, certifications

AI feedback (resume rating, improvement areas, upskill suggestions)



---

📂 Project Structure

Backend

backend/
├── routes/resumeRoutes.js
├── controllers/resumeController.js
├── services/analysisService.js
├── db/index.js
└── server.js

Frontend

frontend/src/components/
├── ResumeUploader.js
├── ResumeDetails.js
├── PastResumesTable.js
└── App.js


---

🚀 Implementation Steps

1. Setup: Create frontend (React) & backend (Node/Express) folders.


2. Database: Create resumes table with JSONB columns.


3. Backend:

Upload route with multer

Parse PDF with pdf-parse

Analyze with Gemini (structured JSON prompt)

Save to PostgreSQL



4. Frontend:

Upload resumes with axios

Display analysis results in a clean UI

History tab with modal details





---

🧪 Testing & Error Handling

Test with diverse resume formats.

Handle missing sections → return null or empty arrays.

Handle corrupted/encrypted PDFs gracefully.

Limit file size uploads.

Show meaningful error messages in both frontend & backend.



---

✅ Submission Checklist

Public GitHub repo with full project

sample_data/ folder (test resumes)

screenshots/ folder (UI images)

Clear README.md with setup instructions



---

📊 Evaluation Criteria

Code quality & modularity

Accuracy of extraction

Relevance of AI suggestions

UI/UX clarity and responsiveness

Robustness against edge cases



---

🔗 References

Node.js Docs

Express.js Docs

PostgreSQL Docs

React Docs

Google Gemini SDK
