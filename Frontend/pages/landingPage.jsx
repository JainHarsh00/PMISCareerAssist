import React, { useState } from "react";
import "../styles/landingPage.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import StatsSection from "../components/statsSection";
import TrustedCompanies from "../components/companiesSection";

export default function LandingPage() {
  const translations = {
    en: {
      badge: "✨ AI-Powered Matching",
      title: "PM Internship AI Recommender",
      subtitle:
        "Discover your perfect government internship match with our advanced AI recommendation system",
      cta: "Get Started",
    },
    hi: {
      badge: "✨ एआई-संचालित मिलान",
      title: "पीएम इंटर्नशिप एआई सिफारिशकर्ता",
      subtitle:
        "हमारी उन्नत एआई अनुशंसा प्रणाली के साथ अपनी परफेक्ट सरकारी इंटर्नशिप खोजें",
      cta: "शुरू करें",
    },
    ta: {
      badge: "✨ செயற்கை நுண்ணறிவு பொருத்தம்",
      title: "பிஎம் இன்டர்ன்ஷிப் ஏஐ பரிந்துரையாளர்",
      subtitle:
        "எங்கள் மேம்பட்ட ஏஐ பரிந்துரைக் கருவியுடன் உங்கள் சரியான அரசு இன்டர்ன்ஷிப்பை கண்டறியுங்கள்",
      cta: "தொடங்கவும்",
    },
  };
  const [lang, setLang] = useState("en");
  const t = translations[lang] || translations.en;

  return (
    <>
      {/* Parallax Background */}
      <div className="parallax-container">
        <Navbar lang={lang} setLang={setLang} />
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
              <span>{t.badge}</span>
            </div>
            <h1 className="hero-title animate-in" style={{ "--delay": "1.4s" }}>
              {t.title}
            </h1>
            <p
              className="hero-subtitle animate-in"
              style={{ "--delay": "1.6s" }}
            >
              {t.subtitle}
            </p>
            <div className="hero-cta animate-in" style={{ "--delay": "1.8s" }}>
              <button
                className="btn btn--primary btn--lg hero-btn"
                id="getStartedBtn"
              >
                <span>{t.cta}</span>
                
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
