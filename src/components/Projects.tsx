import React from 'react';
import copticLogo from '../assets/logos/coptictranslator.png';
import polyLogo from '../assets/logos/polytranslator.png';
import countryCluesLogo from '../assets/logos/countryclues.png';

const Projects = () => (
  <div className="page">
    <h2>Projects</h2>
    <div className="work-experience">
      <a href="https://coptictranslator.com" target="_blank" rel="noopener noreferrer" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={copticLogo} alt="Coptic Translator logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Coptic Translator</div>
          <div className="role-info">
            The #1 online translator for the Coptic language
          </div>
        </div>
      </a>

      <a href="https://polytranslator.com" target="_blank" rel="noopener noreferrer" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={polyLogo} alt="Polytranslator logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Polytranslator</div>
          <div className="role-info">
            A multilingual translation platform supporting 250+ languages
          </div>
        </div>
      </a>

      <a href="/country_clues" className="job-entry article-preview">
        <div className="job-logo-container">
          <img src={countryCluesLogo} alt="Country Clues logo" className="company-logo" />
        </div>
        <div className="job-content">
          <div className="company-name">Country Clues</div>
          <div className="role-info">
            A multiplayer geography guessing game powered by AI
          </div>
        </div>
      </a>
    </div>
  </div>
);

export default Projects;
