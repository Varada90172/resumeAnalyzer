import React, { useEffect, useState } from "react";
import axios from "axios";

const PastResumesTable = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/resumes")
      .then((res) => setResumes(res.data))
      .catch((err) => console.error(err));
  }, []);

  const openModal = (resume) => {
    setSelectedResume(resume);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedResume(null);
    setShowModal(false);
  };

  return (
    <div>
      <h2>Past Resumes</h2>
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>File Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Uploaded At</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map((resume) => (
            <tr key={resume.id}>
              <td>{resume.id}</td>
              <td>{resume.file_name}</td>
              <td>{resume.name || "N/A"}</td>
              <td>{resume.email || "N/A"}</td>
              <td>{resume.phone || "N/A"}</td>
              <td>{new Date(resume.uploaded_at).toLocaleString()}</td>
              <td>
                <button onClick={() => openModal(resume)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && selectedResume && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              maxWidth: "800px",
              width: "90%",
              maxHeight: "80%",
              overflowY: "auto",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedResume.name || "Name not found"}</h3>
            <p>Email: {selectedResume.email || "N/A"}</p>
            <p>Phone: {selectedResume.phone || "N/A"}</p>
            <p>LinkedIn: {selectedResume.linkedin_url || "N/A"}</p>
            <p>Portfolio: {selectedResume.portfolio_url || "N/A"}</p>
            <p>Summary: {selectedResume.summary || "N/A"}</p>

            <h4>Technical Skills</h4>
            <ul>{JSON.parse(selectedResume.technical_skills || "[]").map((s, i) => <li key={i}>{s}</li>)}</ul>

            <h4>Soft Skills</h4>
            <ul>{JSON.parse(selectedResume.soft_skills || "[]").map((s, i) => <li key={i}>{s}</li>)}</ul>

            <h4>Work Experience</h4>
            {JSON.parse(selectedResume.work_experience || "[]").map((job, i) => (
              <div key={i}>
                <strong>{job.role}</strong> at {job.company} ({job.duration})
                <ul>{job.description.map((d, j) => <li key={j}>{d}</li>)}</ul>
              </div>
            ))}

            <h4>Education</h4>
            {JSON.parse(selectedResume.education || "[]").map((edu, i) => (
              <div key={i}>{edu.degree} from {edu.institution} ({edu.graduation_year})</div>
            ))}

            <h4>Resume Rating: {selectedResume.resume_rating || "N/A"}/10</h4>
            <p>Improvement Areas: {selectedResume.improvement_areas || "N/A"}</p>

            <h4>Upskill Suggestions</h4>
            <ul>{JSON.parse(selectedResume.upskill_suggestions || "[]").map((s, i) => <li key={i}>{s}</li>)}</ul>

            <button onClick={closeModal} style={{ marginTop: "20px" }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PastResumesTable;