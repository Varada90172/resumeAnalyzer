import React, { useState } from "react";
import ResumeUploader from "./components/ResumeUploader";
import ResumeDetails from "./components/ResumeDetails";
import PastResumesTable from "./components/PastResumesTable";

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [activeTab, setActiveTab] = useState("upload"); // "upload" or "past"

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>Resume Analyzer</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("upload")}>Upload Resume</button>
        <button onClick={() => setActiveTab("past")}>Past Resumes</button>
      </div>

      {activeTab === "upload" && (
        <>
          <ResumeUploader onUpload={setAnalysis} />
          <ResumeDetails data={analysis} />
        </>
      )}

      {activeTab === "past" && <PastResumesTable />}
    </div>
  );
}

export default App;
