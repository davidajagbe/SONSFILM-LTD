import { Link, useNavigate } from "react-router-dom";
import aboutImage1 from '../assets/IMG-20241022-WA0003.jpg';
import aboutImage2 from '../assets/IMG-20241022-WA0011.jpg';
import aboutImage3 from '../assets/IMG-20241022-WA0008.jpg';
import '../styles/Aboutus.css';

function AboutUs() {
  const navigate = useNavigate();
  
  // Sample user details (to replace with logged-in user details)
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Street, Lagos State, Ikeja City",
  };

  const handleGetStarted = (plan) => {
    navigate('/user/fees', {
      state: { plan, user } // Passing selected plan and user details
    });
  };

  return (
    <>
      <section id="services">
        <h2>Services</h2>
        <h3>Create Your account to get started</h3>
        <div className="services-container">
          <div className="service-card">
            <img src={aboutImage1} alt="Service 1"/>
            <h3>Get Started</h3>
            <p>Ready to unleash your creativity? Join SONSFILM and connect with artists, actors, and models.</p>
            <Link to="/login" className="button-link">Explore &gt;</Link>
          </div>
          <div className="service-card">
            <img src={aboutImage3} alt="Service 2"/>
            <h3>Hire a model</h3>
            <p>Find the perfect model for your next project. Browse our diverse talent pool and hire with ease.</p>
            <Link to="/signup">Sign up &gt;</Link>
          </div>
          <div className="service-card">
            <img src={aboutImage2} alt="Service 3"/>
            <h3>Hire a model</h3>
            <p>Connect with talented models directly. Our platform simplifies the hiring process, putting you in control.</p>
            <Link to="/signup">Sign up &gt;</Link>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about-us">
        <h2>ABOUT US</h2>
        <div className="aboutus-container">
          <div className="aboutus-block">
            <h3>Film Production</h3>
            <p>To carry on business as film directors, script writers, and more.</p>
            <Link to="/signup">Sign up &gt;</Link>
          </div>
          <div className="aboutus-block">
            <h3>Marketing Films</h3>
            <p>To promote, market, distribute, and exhibit films.</p>
            <Link to="/signup">Sign up &gt;</Link>
          </div>
          <div className="aboutus-block">
            <h3>To provide all services required for the marketing of films</h3>
            <p>To promote, market, distribute, exhibit, dub, edit, process, reprocess, duplicate, sell, and hire out films and their derivatives.</p>
            <Link to="/signup">Sign up &gt;</Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <h2>Pricing Options</h2>
        <p>Choose from a variety of pricing plans to suit your needs.</p>
        
        <div className="pricing-container">
          {/* Features Section */}
          <div className="pricing-features">
            {/* Feature 1 */}
            <div className="feature">
              <span className="feature-icon">❤️</span>
              <div>
                <h3>Flexible Options</h3>
                <p>Customize your membership with add-ons and upgrades.</p>
              </div>
            </div>
            {/* Additional features */}
            <div className="feature">
              <span className="feature-icon">🎁</span>
              <div>
                <h3>Exclusive Benefits</h3>
                <p>Unlock special perks and discounts with our premium plans.</p>
              </div>
            </div>
            <div className="feature">
              <span className="feature-icon">👥</span>
              <div>
                <h3>Discounted Rates</h3>
                <p>Enjoy discounted rates for multiple members.</p>
              </div>
            </div>
          </div>

          {/* Pricing Plans Section */}
          <div className="pricing-plans">
            {/* Free Plan */}
            <div className="pricing-plan">
              <h3>The SONSFILM Plan</h3>
              <p style={{ fontWeight: "bolder", whiteSpace: "nowrap" }}>*Free</p>
              <p className="price">N 60,500 <span>/month</span></p>
              <ul className="plan-features">
                <li>Access to facilities</li>
                <li>Free starter pack</li>
                <li>Access to Crew membership Forms</li>
                <li>1-on-1 training sessions</li>
              </ul>
              <div className="button-container">
                <button className="get-started-btn" onClick={() => handleGetStarted("*Free Plan")}>Get Started</button>
              </div>
            </div>

            {/* Regular Plan */}
            <div className="pricing-plan">
              <h3>The SONSFILM Plan</h3>
              <p style={{ fontWeight: "bolder", whiteSpace: "nowrap" }}>Standard</p>
              <p className="price">N 60,500 <span>/month</span></p>
              <ul className="plan-features">
                <li>Everything in Free</li>
                <li>Two Free starter packs</li>
                <li>Access to facilities</li>
                <li>Access to Camping-retreats</li>
                <li>Exclusive community access</li>
                <li>Priority class booking</li>
              </ul>
              <div className="button-container">
                <button className="get-started-btn" onClick={() => handleGetStarted("Standard Plan")}>Get Started</button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="pricing-plan">
              <h3>The SONSFILM Plan</h3>
              <p style={{ fontWeight: "bolder", whiteSpace: "nowrap" }}><span>💎</span> Premium</p>
              <p className="price">N 60,500 <span>/month</span></p>
              <p>For those seeking a comprehensive premium experience</p>
              <ul className="plan-features">
                <li>Everything in Regular</li>
                <li>Unlimited Access to facilities</li>
                <li>Group training sessions</li>
                <li>Special wellness workshops</li>
                <li>Personalized training plans</li>
                <li>Unlimited access to premium classes</li>
                <li>Exclusive VIP events</li>
              </ul>
              <div className="button-container">
                <button className="get-started-btn" onClick={() => handleGetStarted("💎Premium Plan")}>Get Started</button>
              </div>
            </div>
          </div>
        </div>
      </section>



    </>
  )
}

export default AboutUs;
