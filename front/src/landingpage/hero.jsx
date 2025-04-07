// components/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <h1>Empower Your Learning</h1>
      <p>Transform the way you prepare and assess knowledge with our innovative CBT platform.</p>
      <Link to="/register">
        <button className="cta-button">Get Started</button>
      </Link>
    </section>
  );
};

export default Hero;