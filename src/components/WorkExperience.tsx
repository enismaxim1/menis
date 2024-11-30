import React from 'react';
import rampLogo from '../assets/logos/ramp.png';
import hrtLogo from '../assets/logos/hrt.jpeg';
import gustoLogo from '../assets/logos/gusto.jpeg';

const WorkExperience = () => (
  <div className="page">
    <h2>Work</h2>
    <div className="work-experience">
      <a href="https://ramp.com" target="_blank" rel="noopener noreferrer" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={rampLogo} alt="Ramp logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Ramp</div>
          <div className="role-info">
            Software Engineer (Summer 2024 - Present)
          </div>
        </div>
      </a>

      <a href="https://www.hudson-trading.com" target="_blank" rel="noopener noreferrer" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={hrtLogo} alt="HRT logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Hudson River Trading</div>
          <div className="role-info">
            Algorithm Engineer Intern (Summer 2023)
          </div>
        </div>
      </a>

      <a href="https://gusto.com" target="_blank" rel="noopener noreferrer" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={gustoLogo} alt="Gusto logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Gusto</div>
          <div className="role-info">
            Software Engineer Intern (Summer 2022)
          </div>
        </div>
      </a>
    </div>
  </div>
);
export default WorkExperience;
