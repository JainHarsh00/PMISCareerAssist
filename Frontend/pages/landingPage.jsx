import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/landingPage.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StatsSection from "../components/statsSection";
import TrustedCompanies from "../components/companiesSection";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/form"); // Navigate to the /form page
  };

  return (
    <>
      {/* Parallax Background */}
      <div className="parallax-container">
        {/* <Navbar /> */}
        <div className="parallax-layer" data-speed="0.2">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <div className="parallax-layer" data-speed="0.4">
          <div className="floating-shape shape-4"></div>
          <div className="floating-shape shape-5"></div>
          <div className="floating-shape shape-6"></div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero" id="heroSection">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content">
            <div
              className="hero-badge animate-in"
              style={{ "--delay": "0.8s" }}
            >
              <span>✨ AI-Powered Matching</span>
            </div>
            <h1 className="hero-title animate-in" style={{ "--delay": "1.4s" }}>
              PM Internship AI Recommender
            </h1>
            <p
              className="hero-subtitle animate-in"
              style={{ "--delay": "1.6s" }}
            >
              Discover your perfect government internship match with our
              advanced AI recommendation system
            </p>
            <div className="hero-cta animate-in" style={{ "--delay": "1.8s" }}>
              <button
                className="btn btn--primary btn--lg hero-btn"
                id="getStartedBtn"
                onClick={handleGetStartedClick}
              >
                <span>Get Started</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <StatsSection />
      <TrustedCompanies />
      <Footer />
    </>
  );
}
