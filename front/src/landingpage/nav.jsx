// components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <div className="logo">EduTest</div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </nav>
    </header>
  );
};

export default Navbar;