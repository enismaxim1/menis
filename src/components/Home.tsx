import React from 'react';
import Research from './Research';
import WorkExperience from './WorkExperience';
import Writing from './Writing';
import Enis from '../assets/images/enis_v4.png';
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa';
import Projects from './Projects';

const Home = () => (
  <div className="home">
    <div className="header">
      <div className="profile-section">
        <div className="profile-container">
          <div className="profile-image">
            <img src={Enis} alt="Enis" />
          </div>
          <div className="social-links">
            <a href="https://twitter.com/maxim_enis" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://github.com/enismaxim1" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/maximenis" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="profile-text">
          <div style={{ maxWidth: '75%' }}>
            I am a recent graduate of Williams College interested in AI, engineering, startups, and philosophy. Currently working on AI at Ramp. Based in NYC. Contact me at {' '}
            <a 
              className="email"
              onClick={(e) => {
                e.preventDefault();
                const user = atob('ZW5pc21heGltMQ==');
                const domain = atob('Z21haWwuY29t');
                window.location.href = `mailto:${user}@${domain}`;
              }}
              style={{ cursor: 'pointer' }}
            >
              {'enismaxim1 [at] gmail [dot] com'.split('').map((char, i) => (
                <span key={i} style={{ display: 'inline-block' }}>{char}</span>
              ))}
            </a>
            {' '}for any requests. 
          </div>
        </div>
      </div>
    </div>
    
    <div className="sections">
      <Research />
      <WorkExperience />
      <Projects />
      <Writing />
    </div>
  </div>
);

export default Home;