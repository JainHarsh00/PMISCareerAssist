import React from "react";
import "../styles/formPage.css";
import Navbar from "../components/navbar";

const FormPage = () => {
  return (
    <>
      <div className="form-page">
        <div className="form-wrapper">
          {/* LEFT SIDE: FORM */}
          <div className="form-container">
            <form>
              {/* Designation */}
              <label>Designation</label>
              <input type="text" placeholder="eg; Frontend Developer" />

              {/* Internship Type */}
              <label>Internship Type</label>
              <select>
                <option>Field text goes here</option>
                <option>Remote</option>
                <option>On-Site</option>
                <option>Hybrid</option>
              </select>

              {/* Location */}
              <label>Location</label>
              <select>
                <option>Field text goes here</option>
                <option>India</option>
                <option>USA</option>
                <option>Europe</option>
              </select>

              {/* Duration */}
              <label>Duration</label>
              <select>
                <option>Field text goes here</option>
                <option>1 Month</option>
                <option>3 Months</option>
                <option>6 Months</option>
              </select>

              {/* Upload CV */}
              <label>Upload your CV</label>
              <div className="file-upload">
                <input type="file" id="file" hidden />
                <label htmlFor="file" className="file-label">
                  <span>
                    📂 Drop here to attach or <u>upload</u>
                  </span>
                  <small>Max size: 5GB</small>
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="submit-btn">
                SUBMIT
              </button>
            </form>
          </div>

          {/* RIGHT SIDE: CARDS */}
          <div className="cards-container">
            <div className="job-card">
              <h2>Tata Mahindra Pvt. Ltd.</h2>
              <p className="role">Role: Graphic Designer</p>

              <div className="job-footer-row">
                <div className="job-details">
                  <span>📍 Delhi</span>
                  <span>⏰ 12 Months</span>
                  <span>💵 6000pm</span>
                </div>
                <div className="score">
                  Math Score: <b>90%</b>
                </div>
              </div>
              <button className="view-btn">View Job</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormPage;
