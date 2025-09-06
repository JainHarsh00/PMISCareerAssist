import React from "react";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Column 1 */}
        <div className="footer-col">
          <h3>PM Internship AI</h3>
          <p>
            Connecting talent with opportunity across
            India’s leading organizations.
          </p>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#companies">Companies</a></li>
          </ul>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookie">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} PM Internship AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
