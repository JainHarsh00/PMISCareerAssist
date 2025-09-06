import React, { useState } from "react";
import "../styles/navbar.css";
import { Link } from "react-router-dom";
import { CiGlobe } from "react-icons/ci";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const handleLanguageChange = (lang) => {
    document.documentElement.lang = lang;

    const navItems = document.querySelectorAll(".nav-item a");

    if (lang === "hi") {
      navItems[0].textContent = "होम"; // Home
      navItems[1].textContent = "अन्वेषण"; // Explore
      navItems[2].textContent = "खोज"; // Search
      document.querySelector(".nav-search")?.setAttribute("placeholder", "खोज");
    } else if (lang === "ta") {
      navItems[0].textContent = "முகப்பு";
      navItems[1].textContent = "ஆராய";
      navItems[2].textContent = "தேடல்";
      document
        .querySelector(".nav-search")
        ?.setAttribute("placeholder", "தேடல்");
    } else {
      navItems[0].textContent = "Home";
      navItems[1].textContent = "Explore";
      navItems[2].textContent = "Search";
      document
        .querySelector(".nav-search")
        ?.setAttribute("placeholder", "Search...");
    }
  };

  return (
    <nav className="navbar">
      {/* Centered nav-list */}
      <div className="nav-center">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/form">Explore</Link>
          </li>
          <li className="nav-item">
            <Link to="/search">Search</Link>
          </li>
        </ul>
      </div>

      {/* Right globe with dropdown */}
      <div className="nav-globe" onClick={() => setOpen(!open)}>
        <CiGlobe size="2.5em"/>
        <p>EN</p>
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
