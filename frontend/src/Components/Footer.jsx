import React from 'react'

const Footer = () => {
  return (
    <footer className='footer'>
      <div>
        <p><em>STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED</em></p>
        <p>
          <b>MOTTO:</b> ..... raising the STARS
          STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED If you would like more information about joining our company, please fill out the fields below. We ll get back to you as soon as possible!
        </p>
      </div>
      <div className="contact-form">
        <h3>Contact Us</h3>
        <form>
          <input type="text" placeholder="Name">
          <input type="email" placeholder="Email">
          <input type="tel" placeholder="Phone">
          <input type="submit" value="Submit">
        </form>
      </div>
      {/* <!-- Contact info section --> */}
      <div className="contact-info">
        <h3>Contact us</h3>
        <p>+234812550198</p>
        <p>+2347044635612</p>
        <p>+2349116218338</p>
        <p>
          Email: 
          <a href="mailto:info@starsofnigeriafilmsentertainment.com" 
          style="color: white;">
          info@starsofnigeriafilmsentertainment.com
          </a>
        </p>
      </div>
      <div className="links">
        <h3>Quick Links</h3>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="social-media">
        <h3>Follow Us</h3>
        <a href="#facebook"><i className="bi bi-facebook"></i> Facebook</a>
        <a href="#twitter"><i className="bi bi-twitter"></i> Twitter</a>
        <a href="#instagram"><i className="bi bi-instagram"></i> Instagram</a>
      </div>
    </footer>
  )
}

