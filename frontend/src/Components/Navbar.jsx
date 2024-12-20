import '../styles/Navbar.css';
import { useContext } from 'react';
import logo from '../assets/SONSFILM_ENT_LOGO-removebg-preview.png';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

// eslint-disable-next-line react/prop-types
const Navbar = ({toggleMenu, menuOpen}) => {
  const {user,logout} = useContext(AuthContext)
  // const navigate = useNavigate();

  const performSearch = () => {
    const query = document.getElementById('search-input');
    if (query) {
      alert(`Searching for: ${query.value}`);
    }
  };

  return (
    <nav>
      <div className="navbar-container">
        <img src={logo} alt="Logo" className="logo" />
        <div className="search-bar">
          <input type="text" id="search-input" placeholder="Search..." />
          <button onClick={performSearch}>Search</button>
        </div>

        {/* Use menuOpen to add 'active' class */}
        <div className={`navbar ${menuOpen ? 'active' : ''}`}>
          <NavLink to="/">Home</NavLink>
          <div className="dropdown">
            <NavLink to="/about">About Us</NavLink>
            <div className="dropdown-content">
              <NavLink to="/about#services">Our Services</NavLink>
              <NavLink to="/about#pricing">Pricing</NavLink>
              <NavLink to="/#faqs">FAQs</NavLink>
            </div>
          </div>
          <NavLink to="/events">Event</NavLink>
          <div className="dropdown">
            <NavLink to="/contact">Contact</NavLink>
            <div className="dropdown-content">
              <NavLink to="/contact#contact-us">Contact Us</NavLink>
              <NavLink to="/contact#testimonials">Testimonials</NavLink>
              <NavLink to="/contact#location">Map Location</NavLink>
            </div>
          </div>
          {user ? (
            <>
              {/* User's Profile */}
              <NavLink to="/notifications" className="notification-icon" alt='notifications'>
                <FaBell size={20} />
              </NavLink>
              <NavLink to="/profile" className="profile-link">
                <span>{user.name}</span>
                <FaUserCircle size={24} />
              </NavLink>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup" className="signup">Sign Up</NavLink>
            </>
          )}
        </div>
        <div className="menu-icon" onClick={toggleMenu}>
          &#9776;
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
