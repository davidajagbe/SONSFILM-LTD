import React from 'react';
import Hero from '../Components/Hero';
import Advert from '../Components/Advert';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminProfile from '../assets/adminprofile.jpg';
import axios from 'axios';

const HomePage = () => {

  const [visibleAnswers, setVisibleAnswers] = useState({}); 
  const toggleAnswer = (index) => {
    setVisibleAnswers((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const faqData = [
    {
      question: 'What services do we offer?',
      answer: 'We offer a range of services including film production, modeling...',
    },
    {
      question: 'How can you book a model?',
      answer: 'You can book a model by filling out our Artist Membership form...',
    },
    {
      question: 'What is the pricing for our services?',
      answer: 'THE SUM OF SIXTY THOUSAND FIVE HUNDRED NAIRE (#60, 500 )...',
    },
    {
      question: 'How can I contact you?',
      answer: 'You can contact us via email at info@starsofnigeriafilmsentertainment.com or by phone at +234812550198.',
    },
    {
      question: 'Payment Instructions?',
      answer: <><h4>Pay the neccessary amount and upload payment slip in the fees page,</h4> <p>wait for review as an otp will be sent after review. This will be used to activate your account</p></>,
    }
  ];

  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get('/api/users/profile');
        const user = response.data;
        if (user && user.ad && user.ad.imageUrl) {
          const imageUrl = `${window.location.origin}${user.ad.imageUrl}`; 
          setAds([{
            imageUrl: imageUrl, 
            linkUrl: user.ad.linkUrl,
            altText: user.ad.altText,
          }]);
        }
      } catch (error) {
        console.error('Error fetching ads:', error);
      }
    };
    fetchAds();
  }, []); 

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <section className="about-us-section">
          <div className="about-us-container grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Added grid for responsiveness */}
            <div className="about-image" id='img'>
              <img src={adminProfile} alt="About Us" />
            </div>
            <div className="about-text">
              <h2>We are an umbrella binding ACTORS and CREWS.</h2>
              <h3>The objective for which the company is established are</h3>
              <div className="about-cards grid grid-cols-1 md:grid-cols-3 gap-8"> {/* Added grid for responsiveness */}
                <div className="about-card p-6 bg-white rounded-lg shadow-md"> {/* Added Tailwind classes */}
                  <h3>To carry on business as film producers</h3>
                  <p>To carry on business as film directors, script writers, script developers, film editors, film making personnel of all description. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, possimus!</p>
                  <Link to="/signup" className="text-blue-500 hover:underline">Sign Up &gt;</Link>
                </div>
                <div className="about-card p-6 bg-white rounded-lg shadow-md">
                  <h3>To make, shoot, direct, record, produce and supply films</h3>
                  <p>To build, acquire, equip, establish, maintain, manage and run film studios and any premises required or useful for shooting or making films. Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
                  <Link to="/signup" className="text-blue-500 hover:underline">Sign Up &gt;</Link>
                </div>
                <div className="about-card p-6 bg-white rounded-lg shadow-md">
                  <h3>To provide all services required for the marketing of films</h3>
                  <p>To enter into contract for and to engage the services of actors, actresses, singers, dancers, comedians, entertainers. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet, aspernatur.</p>
                  <Link to="/signup" className="text-blue-500 hover:underline">Explore &gt;</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Advert /> {/* Moved Advert below About Us */}
        <div className="mt-12">
          <h2>Advertisements</h2>
          <div className="ads-section">
            {ads.map((ad, index) => (
              <Advert key={index} imageUrl={ad.imageUrl} linkUrl={ad.linkUrl} altText={ad.altText} />
            ))}
          </div>

          {/* FAQ Section */}
          <section id="faq" className="mt-12">
            <h2 className='h2'>Frequently Asked Questions</h2>
            <div className="faq-container">
              {faqData.map((faq, index) => (
                <div key={index} className="faq border-b border-gray-200 py-4"> {/* Added Tailwind classes */}
                  <div 
                    className="faq-question cursor-pointer" 
                    onClick={() => toggleAnswer(index)}
                  >
                    {faq.question}
                    <span className={`arrow ${visibleAnswers[index] ? 'up' : ''}`}>&gt;</span>
                  </div>
                  {visibleAnswers[index] && (
                    <div className="faq-answer mt-2"> {/* Added margin */}
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;