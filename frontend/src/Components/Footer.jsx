import { Link } from 'react-router-dom';
import { useState } from 'react';
import '../styles/Footer.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaFacebook,FaInstagram,FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    try {
      const {data} = await axios.post('/api/users/contact', formData);
      toast.success(data.message);
      // Optionally display a success message to the user
    } catch (error) {
      toast.error('Error submitting form:', error);
      console.error('Error submitting form:', error);
      // Optionally display an error message to the user
    }
  };
  return (
    <>
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="firstName" // Add name attribute
              placeholder="First Name"
              value={formData.name} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
            <input
              type="email"
              name="email" // Add name attribute
              placeholder="Email"
              value={formData.email} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
            <input
              type="tel"
              name="phone" // Add name attribute
              placeholder="Phone"
              value={formData.phone} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className='contact-info'>
          <h3>Contact Us</h3>
          <p>+234812550198</p>
          <p>+2347044635612</p>
          <p>+2349116218338</p> 
          <p>Email: <span><Link to='mailto:info@starsofnigeriafilmsentertainment.com' className='mail-link'>info@starsofnigeriafilmsentertainment.com</Link></span></p>
        </div>
        <div className='links'>
          <h3>Quick Links</h3>
          <ul>
            <li className='a'><Link to='/' >Home</Link></li>
            <li className='a'><Link to='/about#services'>Services</Link></li>
            <li className='a'><Link to='/contact'>Contact</Link></li>
          </ul>
        </div>
        <div className='social-media'>
          <h3>Follow Us</h3>
          <Link className='a' to='https://www.facebook.com/profile.php?id=61571167565009&mibextid=ZbWKwL'><FaFacebook className='icon'/>Facebook</Link>
          <Link className='a' to='https://www.tiktok.com/@sonfilmsent?_t=8scTREHSBPS&_r=1'><FaYoutube className='icon'/>TikTok</Link>
          <Link className='a' to='#instagram'><FaInstagram className='icon'/>Instagram</Link>
        </div>

      </footer>
      <div className="footer-bottom">
        <p>&copy; 2023 Stars of Nigeria Films Entertainment Limited. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
