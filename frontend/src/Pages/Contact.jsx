import { useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/Contact.css';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';
// import { IconName } from 'react-icons/bs';
const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    feedback: '',
  });
  const [showFullLocations, setShowFullLocations] = useState({
    lagos: false,
    ogun: false,
    abia: false,
  });

  const handleToggleLocation = (location) => {
    setShowFullLocations((prevState) => ({
      ...prevState,
      [location]: !prevState[location],
    }));
  };
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    setIsSubmitting(true);
    try {
      const {data} = await axios.post('/api/users/contact', formData);
      toast.success(data.message);
      // Optionally display a success message to the user
    } catch (error) {
      toast.error('Error submitting form:', error);
      console.error('Error submitting form:', error);
      // Optionally display an error message to the user
    }
    finally{
      setIsSubmitting(false); // Set loading to false after the request completes
    }
  };
  useEffect(() => {
    const locationElements = document.querySelectorAll(".location");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    locationElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
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

        <form className="contact-form" onSubmit={handleSubmit}> {/* Add onSubmit handler */}
          <div className="form-row">
            <input
              type="text"
              name="firstName" // Add name attribute
              placeholder="First Name"
              value={formData.firstName} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
            <input
              type="text"
              name="lastName" // Add name attribute
              placeholder="Last Name"
              value={formData.lastName} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
          </div>
          <div className="form-row">
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
              placeholder="Phone Number"
              value={formData.phone} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            />
          </div>
          <div className="form-row" id="feedback">
            <select
              name="feedback" // Add name attribute
              value={formData.feedback} // Bind to state
              onChange={handleChange} // Add onChange handler
              required
            >
              <option value="" >
                Select One...
              </option>
              <option value="general">General Inquiry</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>
          </div>
          <button 
          type="submit"
          disabled={isSubmitting}
          > {/* Change to submit button */}
            Send
            {isSubmitting && <ClipLoader size={18} color="#f9f9f9" />} {/* Show spinner if isVerifying is true */}
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
          {/* LAGOS STATE OFFICE */}
          <div className="location">
            <h2>LAGOS STATE OFFICE</h2>
            {showFullLocations.lagos ? (
              <>
                <p>
                  16b Ayanleye street, off info street , 2nd
                  junction , Ogba, IKEJA, LAGOS STATE
                  NIGERIA
                </p>
                <p>
                  TEL: +2348162550198, +2347044635612,
                  +2349116218338
                </p>
                <p>EMAIL: nkakuoma@gmail.com</p>
              </>
            ) : (
                <p>16b Ayanleye street, off info street ...</p>
            )}
            <Link
              to="#"
              onClick={() => handleToggleLocation("lagos")}
            >
            {showFullLocations.lagos
              ? "View Less"
              : "View Location"}
            </Link>
          </div>

          {/* OGUN STATE OFFICE */}
          <div className="location">
            <h2>OGUN STATE OFFICE</h2>
            {showFullLocations.ogun ? (
              <>
                <p>
                  27 salami ojerinde street, ola - ore bus
                  stop AGBADO , OGUN STATE NIGERIA
                </p>
                <p>
                  TEL: +2348162550198, +2347044635612,
                  +2349116218338
                </p>
                <p>EMAIL: nkakuoma@gmail.com</p>
              </>
            ) : (
              <p>27 salami ojerinde street, ola - ore ...</p>
            )}
            <Link
              to="#"
              onClick={() => handleToggleLocation("ogun")}
            >
              {showFullLocations.ogun
                ? "View Less"
                : "View Location"}
            </Link>
          </div>

          {/* ABIA STATE OFFICE */}
          <div className="location">
            <h2>ABIA STATE OFFICE</h2>
            {showFullLocations.abia ? (
              <>
                <p>
                  Stars Of Nigeria Films Entertainment Road.
                  Ubakala, umuahia ABIA STATE NIGERIA
                </p>
                <p>
                  TEL: +2348162550198, +2347044635612,
                  +2349116218338
                </p>
                <p>EMAIL: nkakuoma@gmail.com</p>
              </>
            ) : (
              <p>Stars Of Nigeria Films Entertainment Road ...</p>
            )}
            <Link
              to="#"
              onClick={() => handleToggleLocation("abia")}
            >
              {showFullLocations.abia
                ? "View Less"
                : "View Location"}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Contact;
