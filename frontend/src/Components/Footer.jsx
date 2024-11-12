import { Link } from 'react-router-dom';
import '../styles/Footer.css';
import { FaFacebook,FaInstagram,FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <>
      <footer className='footer'>
        <div>
          <p><em>STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED</em></p>
          <p>
            <b>MOTTO:</b> ..... raising the STARS STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED. If you would like more information about joining our company, please fill out the fields below. Well get back to you as soon as possible!
          </p>
        </div>
        <div className='contact-form'>
          <h3>Contact Us</h3>
          <form>
            <input type='text' placeholder='Name' />
            <input type='email' placeholder='Email' />
            <input type='tel' placeholder='Phone' />
            <input type='submit' value='Submit' />
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
          <FaFacebook className='icon'/><Link className='a' to='#facebook'>Facebook</Link>
          <FaYoutube className='icon'/><Link className='a' to='#twitter'>Youtube</Link>
          <FaInstagram className='icon'/><Link className='a' to='#instagram'>Instagram</Link>
        </div>

      </footer>
      <div className="footer-bottom">
        <p>&copy; 2023 Stars of Nigeria Films Entertainment Limited. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
