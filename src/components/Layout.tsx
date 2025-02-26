import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Writing from './Writing';
import WorkExperience from './WorkExperience';
import Article from './Article';
import Consulting from './Consulting';

const Layout = () => (
  <div className="layout">
    <nav className="navigation">
      <div className="nav-content">
        <Link to="/" className="nav-brand">Maxim Enis</Link>
        <div className="nav-links">
          <Link to="/consulting" className="nav-link">Consultations</Link>
          <Link to="/writing" className="nav-link">Writing</Link>
        </div>
      </div>
    </nav>
    <div className="content" style={{ paddingTop: '2rem' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/writing" element={<Writing />} />
        <Route path="/writing/:slug" element={<Article />} />
        <Route path="/work" element={<WorkExperience />} />
      </Routes>
    </div>
  </div>
);

export default Layout;