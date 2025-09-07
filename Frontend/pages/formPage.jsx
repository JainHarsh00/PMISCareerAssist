import React, { useState } from "react";
import "../styles/formPage.css";
import Navbar from "../components/navbar";

const FormPage = () => {
  const [recommendations, setRecommendations] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const res = await fetch("/recommend", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setRecommendations(data);
  };

  return (
    <div className="form-page">
      <div className="form-wrapper">
        {/* LEFT SIDE: FORM */}
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Designation</label>
            <input
              name="designation"
              type="text"
              placeholder="eg; Frontend Developer"
            />

            <label>Internship Type</label>
            <select name="internship_type">
              <option>Remote</option>
              <option>On-Site</option>
              <option>Hybrid</option>
            </select>

            <label>Location</label>
            <input name="location" type="text" placeholder="eg; Surat" />

            <label>Duration</label>
            <input name="duration" type="text" placeholder="eg; 6 Months" />

            <label>Upload your CV</label>
            <input name="cv" type="file" accept="application/pdf" />

            <button type="submit" className="submit-btn">
              SUBMIT
            </button>
          </form>
        </div>

        {/* RIGHT SIDE: RECOMMENDATIONS */}
        <div className="cards-container">
          {recommendations.length > 0 ? (
            recommendations.map((job, idx) => (
              <div key={idx} className="job-card">
                <h2>{job.company_name}</h2>
                <p className="role">Role: {job.role_title}</p>

                <div className="job-footer-row">
                  <div className="job-details">
                    <span>📍 {job.location}</span>
                    <span>⏰ {job.duration_months} Months</span>
                    <span>💵 {job.stipend_amount} pm</span>
                  </div>
                  <div className="score">
                    Match Score: <b>{(job.similarity * 100).toFixed(2)} %</b>
                  </div>
                </div>
                <a
                  href="https://pminternship.mca.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="view-btn">View Job</button>
                </a>
              </div>
            ))
          ) : (
            <div className="no-result">
              No recommendations yet. Submit the form!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormPage;
