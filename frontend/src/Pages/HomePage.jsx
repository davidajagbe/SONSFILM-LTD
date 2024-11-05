import Hero from '../Components/Hero';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'

const HomePage = (questionElement) => {

  // const toggleAnswer = (questionElement)=> {
  //   const answerElement = questionElement;
  //   answerElement.style.display = answerElement.style.display === 'block' ? 'none' : 'block';
  // }

  return (
    <>  
      <Hero/>
      <section id="services">
        <h2>Services</h2>
        <h3>Create Your account to get started</h3>
        <div className="services-container">
          <div className="service-card">
            <img src="path/to/image1.jpg" alt="Service 1"/>
            <h3>Get Started</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <Link to="#get-started" className="button-link">{`Explore >`}</Link>
          </div>
          <div className="service-card">
            <img src="path/to/image3.jpg" alt="Service 2"/>
            <h3>Hire a model</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <Link to="#hire-model">Sign up</Link>
          </div>
          
          <div className="service-card">
            <img src="path/to/image3.jpg" alt="Service 3"/>
            <h3>Hire a model</h3>
            <p>Lorem ipsum dolor sit amet.</p>
            <Link to="#hire-model">{`Sign up >`}</Link>
          </div>
        </div>
      </section>
      {/* <!-- About Us Section --> */}
      <section id="about-us">
        <h2>ABOUT US</h2>
        <div className="mission-container">
          <div className="mission-block">
            <h3>Film Production</h3>
            <p>To carry on business as film directors, script writers, and more.</p>
            <Link to="#signup">{`Sign up >`}</Link>
          </div>
          <div className="mission-block">
            <h3>Marketing Films</h3>
            <p>To promote, market, distribute, and exhibit films.</p>
            <Link to="#signup">{`Sign up >`}</Link>
          </div>
          <div className="mission-block">
            <h3>To provide all services required for the marketing of films</h3>
            <p>To promote, market, distribute, exhibit, dub, edit, process, reprocess, duplicate, sell, and hire out films and their derivatives.</p>
            <Link to="#signup">{`Sign up >`}</Link>
          </div>
        </div>
      </section>
      <section id="faq">
        <div>
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq">
              <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                What services do you offer?
              </div>
              <div className="faq-answer">
                We offer a range of services including film production, modeling, event planning, and music production.
              </div>
            </div>

            <div className="faq">
              <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                How can I book a model?
              </div>
              <div className="faq-answer">
                You can book a model by filling out our contact form or directly contacting us through our email or phone number.
              </div>
            </div>

            <div className="faq">
                <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                  What is the pricing for your services?
                </div>
                <div className="faq-answer">
                  Pricing varies depending on the service you require. Please contact us for a detailed quote.
                </div>
            </div>

            <div className="faq">
              <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                Do you have any testimonials from previous clients?
              </div>
              <div className="faq-answer">
                Yes, we have numerous testimonials from satisfied clients which you can find on our website under the testimonials section.
              </div>
            </div>

            <div className="faq">
              <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                How can I contact you?
              </div>
              <div className="faq-answer">
                You can contact us via email at info@starsofnigeriafilmsentertainment.com or by phone at +234812550198.
              </div>
            </div>

            {/* <!-- Insert additional FAQs from the uploaded document here --> */}
            {/* <!-- Example (replace with content from the file) --> */}
            <div className="faq">
              <div className="faq-question" onClick={function toggleAnswer (){
                const answerElement = questionElement.nextElementSibling;
                answerElement.style.display === 'block' ? 'none' : 'block';}}>
                Additional FAQ question from file?
              </div>
              <div className="faq-answer">
                Answer to additional FAQ question from file.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
