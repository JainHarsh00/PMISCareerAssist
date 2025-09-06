import React, { useEffect, useRef, useState } from "react";
import "../styles/statsSection.css";

// 👇 Stat Item with count-up animation
const StatItem = ({ target, label, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            let start = 0;
            const end = parseInt(target.replace("+", "+")); // e.g. "300+" → 300
            const stepTime = 16; // ~60fps
            const steps = duration / stepTime;
            const increment = Math.ceil(end / steps);

            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                clearInterval(timer);
                setCount(target); // final number with +
              } else {
                setCount(start);
              }
            }, stepTime);

            observer.unobserve(entry.target); // only run once
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <div className="stat-item" ref={ref}>
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  );
};

export default function StatsSection() {
  const buttonRef = useRef(null);


  return (
    <section className="stats-section">
      <div className="stats-container">
        {/* Left Content */}
        <div className="stats-left">
          <h2>
            We’ve helped students and professionals unlock{" "}
            <span className="highlight">career opportunities</span> by
            connecting them with the right internships and jobs to grow, learn,
            and succeed.
          </h2>
          <button ref={buttonRef} className="blur-btn">
            Search
          </button>
        </div>

        {/* Right Content */}
        <div className="stats-right">
          <StatItem target="300+" label="Job opportunities" />
          <StatItem target="1000+" label="Vacancies" />
          <StatItem target="100+" label="Companies" />
        </div>
      </div>
    </section>
  );
}
