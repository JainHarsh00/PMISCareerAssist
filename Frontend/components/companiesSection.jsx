import React from "react";
import "../styles/TrustedCompanies.css";

const companies = [
  { code: "TCS", name: "TATA Consultancy Services", domain: "IT & Software Development" },
  { code: "INF", name: "Infosys Limited", domain: "IT & Software Development" },
  { code: "HDF", name: "HDFC Bank Limited", domain: "Banking & Financial Services" },
  { code: "REL", name: "Reliance Industries", domain: "Oil Gas & Energy" },
  { code: "WIP", name: "Wipro Limited", domain: "IT & Software Development" },
  { code: "MAR", name: "Maruti Suzuki", domain: "Automotive" },
];

export default function TrustedCompanies() {
  return (
    <section className="trusted-section">
      <h2>Trusted by Leading Companies</h2>
      <p>Partner with India’s most respected organizations</p>
      <div className="company-slider">
        <div className="company-track">
          {companies.concat(companies).map((c, i) => (
            <div className="company-card" key={i}>
              <div className="company-code">{c.code}</div>
              <div className="company-info">
                <h3>{c.name}</h3>
                <p>{c.domain}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
