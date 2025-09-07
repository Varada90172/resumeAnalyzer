import React from "react";

const ResumeDetails = ({ data }) => {
  if (!data) return null;

  return (
    <div style={{ marginTop: "20px", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{data.name || "Name not found"}</h2>
      <p><strong>Email:</strong> {data.email || "N/A"}</p>
      <p><strong>Phone:</strong> {data.phone || "N/A"}</p>
      <p><strong>LinkedIn:</strong> {data.linkedin_url || "N/A"}</p>
      <p><strong>Portfolio:</strong> {data.portfolio_url || "N/A"}</p>
      <p><strong>Summary:</strong> {data.summary || "N/A"}</p>

      <h3>Technical Skills</h3>
      <ul>
        {data.technical_skills?.length > 0 
          ? data.technical_skills.map((skill, i) => <li key={i}>{skill}</li>) 
          : <li>N/A</li>
        }
      </ul>

      <h3>Soft Skills</h3>
      <ul>
        {data.soft_skills?.length > 0 
          ? data.soft_skills.map((skill, i) => <li key={i}>{skill}</li>) 
          : <li>N/A</li>
        }
      </ul>

      <h3>Work Experience</h3>
      {data.work_experience?.length > 0 
        ? data.work_experience.map((job, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <strong>{job.role}</strong> at {job.company} ({job.duration})
              <ul>
                {job.description.map((d, j) => <li key={j}>{d}</li>)}
              </ul>
            </div>
          )) 
        : <p>N/A</p>
      }

      <h3>Education</h3>
      {data.education?.length > 0 
        ? data.education.map((edu, i) => (
            <div key={i}>
              {edu.degree} from {edu.institution} ({edu.graduation_year})
            </div>
          )) 
        : <p>N/A</p>
      }

      <h3>Resume Rating: {data.resume_rating ? `${data.resume_rating}/10` : "N/A"}</h3>
      <p><strong>Improvement Areas:</strong> {data.improvement_areas || "N/A"}</p>

      <h3>Upskill Suggestions</h3>
      <ul>
        {data.upskill_suggestions?.length > 0 
          ? data.upskill_suggestions.map((s, i) => <li key={i}>{s}</li>) 
          : <li>N/A</li>
        }
      </ul>
    </div>
  );
};

export default ResumeDetails;