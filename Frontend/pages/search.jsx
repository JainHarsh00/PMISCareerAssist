import React from "react";
import "../styles/searchPage.css";

const SearchPage = () => {
  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search for jobs, companies, roles…"
          className="search-bar"
        />
        <span className="search-icon">🔍</span>
      </div>
      <div className="search-results-container">
        <div className="search-job-card">
          <h2>Tata Mahindra Pvt. Ltd.</h2>
          <p className="role">Role: Graphic Designer</p>
          <div className="job-details">
            <span>📍 Delhi</span>
            <span>⏰ 12 Months</span>
            <span>💰 6000pm</span>
          </div>
          <button className="view-btn">View Job</button>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
