import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("en");

  const translations = {
    en: { home: "Home", explore: "Explore", search: "Search" },
    hi: { home: "होम", explore: "अन्वेषण", search: "खोज" },
    ta: { home: "முகப்பு", explore: "ஆராய", search: "தேடல்" },
    te: { home: "హోమ్", explore: "అన్వేషించండి", search: "వెతకండి" },
    bn: { home: "হোম", explore: "অন্বেষণ", search: "অনুসন্ধান" },
  };

  const handleLanguageChange = (language) => {
    setLang(language);
    document.documentElement.lang = language; // optional
    setOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Centered nav-list */}
      <div className="nav-center">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">{translations[lang].home}</Link>
          </li>
          <li className="nav-item">
            <Link to="/form">{translations[lang].explore}</Link>
          </li>
          <li className="nav-item">
            <Link to="/search">{translations[lang].search}</Link>
          </li>
        </ul>
      </div>

      {/* Right globe with dropdown */}
      <div className="nav-globe" onClick={() => setOpen(!open)}>
        <CiGlobe size="2.5em" />
        <p>{lang.toUpperCase()}</p>
        {open && (
          <div className="dropdown">
            <button onClick={() => handleLanguageChange("en")}>English</button>
            <button onClick={() => handleLanguageChange("hi")}>हिन्दी</button>
            <button onClick={() => handleLanguageChange("ta")}>தமிழ்</button>
            <button onClick={() => handleLanguageChange("te")}>తెలుగు</button>
            <button onClick={() => handleLanguageChange("bn")}>বাংলা</button>
          </div>
        )}
      </div>
    </nav>
  );
}
