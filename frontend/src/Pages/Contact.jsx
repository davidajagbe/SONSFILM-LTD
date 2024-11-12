import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Contact.css';
// import { IconName } from 'react-icons/bs';
const Contact = () => {
  function feedbackResponse() {
    const feedbackResponse = document.getElementById('feedback').value;
    if (feedbackResponse) {
      alert(`Thank you for taking the time to contact us! Your enquiry on ${feedbackResponse} will be attended to.`);
    }
  }

  useEffect(() => {
    const locationElements = document.querySelectorAll('.location');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    locationElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section id="contact-us" className="main-container">
        <div className="contact-form-container">
          <h1>Get in Touch</h1>
          <p>Have a question? We're here to help.</p>

          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <input type="text" placeholder="First Name" required />
              <input type="text" placeholder="Last Name" required />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" required />
              <input type="tel" placeholder="Phone Number" required />
            </div>
            <div className="form-row" id="feedback">
              <select required>
                <option value="" disabled selected>
                  Select One...
                </option>
                <option value="general">General Inquiry</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            <button type="button" onClick={feedbackResponse}>
              Send
            </button>
          </form>
        </div>
      </section>

      <section id="testimonials" className="testimonials-container">
        <h2>Customer Reviews</h2>
        <p>What our customers are saying...</p><br />
        <div className="testimonials">
          <div className="testimonial-card green-light">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat vel sunt minus sed doloribus omnis! Magnam neque, at facilis exercitationem expedita laudantium eaque error delectus possimus asperiores aliquid earum reiciendis nisi sint facere ipsam atque quos voluptate vero eius consectetur!</p>
            <h4>Lance Jarvis</h4>
            <div className="social-icons">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-linkedin"></i>
            </div>
          </div>
          <div className="testimonial-card green-medium">
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo officiis optio quo, possimus iste eos natus in modi dignissimos quasi pariatur reprehenderit? Mollitia possimus laudantium vitae, nihil voluptas aspernatur cumque qui eos voluptatum saepe reiciendis impedit veniam repellendus quis soluta iure nisi explicabo laborum in?</p>
            <h4>Ericka Lynda</h4>
            <div className="social-icons">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-linkedin"></i>
            </div>
          </div>
          <div className="testimonial-card green-dark">
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam doloribus in dolorem, optio rerum ducimus quasi distinctio eligendi quibusdam eius fuga voluptatem accusamus beatae nemo perferendis, fugit repellat, officiis voluptates voluptatum debitis laudantium culpa. Accusantium reiciendis vero eaque doloribus culpa.</p>
            <h4>Neil Wilford</h4>
            <div className="social-icons">
              <i className="fa fa-facebook"></i>
              <i className="fa fa-twitter"></i>
              <i className="fa fa-linkedin"></i>
            </div>
          </div>
        </div>
      </section>

      <footer id="location" className="location-section">
        <h1>Meet Us at Our Locations</h1>
        <p className="subtitle">Find a location near you</p>
        <div className="locations">
          <div className="location">
            <h2>Sydney</h2>
            <p>St, Sydney NSW 2000 AU</p>
            <Link to="/">View Location</Link>
          </div>
          <div className="location">
            <h2>New York</h2>
            <p>New York NY 10000 USA</p>
            <Link to="/">View Location</Link>
          </div>
          <div className="location">
            <h2>London</h2>
            <p>London WC1 IDE, United Kingdom</p>
            <Link to="/">View Location</Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
