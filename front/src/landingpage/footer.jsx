// components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logo">EduTest</div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/privacy">Privacy Policy</Link>
      </div>
      <p>&copy; 2025 EduTest. All Rights Reserved.</p>
    </footer>
  );
};

export default Footer;