import '../styles/Navbar.css';
import logo from '../assets/SONSFILM_ENT_LOGO-removebg-preview.png';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const performSearch = () => {
    const query = document.getElementById('search-input');
    if (query) {
        alert(`Searching for: ${query.value}`);
        // Additional search functionality can be added here
    }
  };

  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="" className='logo'/>
        <div className="search-bar">
          <input type="text" id="search-input" placeholder="Search..."/>
          <button onClick={performSearch()} >Search</button>
        </div>

        <div className="navbar">
          <NavLink to="#home">Home</NavLink>
          <div className="dropdown">
            <NavLink to="#about">About Us</NavLink>
            <div className="dropdown-content">
              <NavLink to="#about-us">About Us</NavLink>
              <NavLink to="#services">Our Services</NavLink>
              <NavLink to="#team">Our Team</NavLink>
              <NavLink to="#pricing">Pricing</NavLink>
              <NavLink to="#faqs">FAQs</NavLink>
            </div>
          </div>
          <NavLink to="#event">Event</NavLink>
          <div className="dropdown">
            <NavLink to="#contact">Contact</NavLink>
            <div className="dropdown-content">
              <NavLink to="#contact-us">Contact Us</NavLink>
              <NavLink to="#testimonials">Testimonials</NavLink>
              <NavLink to="#map-location">Map Location</NavLink>
            </div>
          </div>
          <NavLink to="login.html">Login</NavLink>
          <NavLink to="form.html" className="signup">Sign Up</NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
