import Hero from '../Components/Hero';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import homeImage from '../assets/IMG-20241022-WA0010.jpg'
import '../styles/HomePage.css';

const HomePage = () => {

  const [visibleAnswers, setVisibleAnswers] = useState({}); // Track visibility for each FAQ item by index

  // Toggle function to show/hide answers for each FAQ item
  const toggleAnswer = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const faqData = [
    {
      question: 'What services do you offer?',
      answer: 'We offer a range of services including film production, modeling...',
    },
    {
      question: 'How can I book a model?',
      answer: 'You can book a model by filling out our contact form...',
    },
    {
      question: 'What is the pricing for your services?',
      answer: 'Pricing varies depending on the service you require...',
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact us via email at info@starsofnigeriafilmsentertainment.com or by phone at +234812550198.',
    },
    {
      question: 'Do you have any testimonials from previous clients?',
      answer: 'Yes, we have numerous testimonials from satisfied clients which you can find on our website under the testimonials section.',
    }
  ];

  return (
    <>  
      <Hero/>
      <section className="about-us-section">
        <div className="about-us-container">
          {/* Image Section */}
          <div className="about-image" id='img'>
            <img src={homeImage} alt="About Us" />
          </div>

          {/* Text Section */}
          <div className="about-text">
            <h2>We are an umbrella binding ACTORS and CREWS.</h2>
            <h3>The objective for which the company is established are</h3>
          </div>

          {/* Cards Section */}
          <div className="about-cards">
            <div className="about-card">
              <h3>To carry on business as film producers</h3>
              <p>To carry on business as film directors, script writers, script developers, film editors, film making personnel of all description. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, possimus!</p>
              <Link to="/signup" className="about-card-link">Sign Up &gt;</Link>
            </div>
            <div className="about-card">
              <h3>To make, shoot, direct, record, produce and supply films</h3>
              <p>To build, acquire, equip, establish, maintain, manage and run film studios and any premises required or useful for shooting or making films. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <Link to="/signup" className="about-card-link">Sign Up &gt;</Link>
            </div>
            <div className="about-card">
              <h3>To provide all services required for the marketing of films</h3>
              <p>To enter into contract for and to engage the services of actors, actresses, singers, dancers, comedians, entertainers. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, aspernatur.</p>
              <Link to="/signup" className="about-card-link">Explore &gt;</Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq">
        <h2 className='h2'>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqData.map((faq, index) => (
            <div key={index} className="faq">
              <div 
                className="faq-question" 
                onClick={() => toggleAnswer(index)}
              >
                {faq.question}
                <span className={`arrow ${visibleAnswers[index] ? 'up' : ''}`}>&gt;</span>
              </div>
              {visibleAnswers[index] && (
                <div className="faq-answer">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;


