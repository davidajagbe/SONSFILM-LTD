// import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero-section">
      <h1>WELCOME TO STARS OF NIGERIA FILMS ENTERTAINMENT LTD</h1>
      <h2>THE HOME OF MOVIES, MODELLING & MUSIC</h2>
      <p>To provide all services required for the marketing of films<br/>(including but not limited to promotion)</p>
      <p className="business-call">Come lets do business.</p>
      <div className="buttons">
        <Link to='/about' className="explore-btn">Explore</Link>
        <Link to='/signup' className="signup-btn">Sign up</Link>
      </div>
  </section>
  );
};

export default Hero;
