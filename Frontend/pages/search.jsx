import React, { useEffect, useState } from "react";
import "../styles/searchPage.css";

const SearchPage = () => {
  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetch("/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data))
      .catch((err) => console.error("Error fetching jobs:", err));
  }, []);

  // 🔍 Filtering logic
  const filteredJobs = jobs.filter((job) => {
    const query = searchText.toLowerCase();

    return (
      job.company_name?.toLowerCase().includes(query) ||
      job.role_title?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query) ||
      job.stipend_amount?.toString().includes(query) ||
      job.duration_months?.toString().includes(query) ||
      job.required_skills?.toString().toLowerCase().includes(query)
    );
  });

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for jobs, companies, roles…"
          className="search-bar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="search-results-container">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="search-job-card">
              <h2>{job.company_name}</h2>
              <p className="role">Role: {job.role_title}</p>
              <p className="description">{job.job_description}</p>
              <div className="job-details">
                <span>📍 {job.location}</span>
                <span>⏰ {job.duration_months} Months</span>
                <span>💰 {job.stipend_amount} pm</span>
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
          <div className="no-results">Searching...</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
