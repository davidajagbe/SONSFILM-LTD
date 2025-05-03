
import { Link, useNavigate } from "react-router-dom";
import aboutImage1 from '../assets/IMG-20241022-WA0003.jpg';
import aboutImage2 from '../assets/IMG-20241022-WA0011.jpg';
import aboutImage3 from '../assets/IMG-20241022-WA0008.jpg';

function AboutUs() {
  const navigate = useNavigate();
  
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    address: "123 Street, Lagos State, Ikeja City",
  };

  const handleGetStarted = (plan) => {
    navigate('/user/fees', {
      state: { plan, user }
    });
  };

  return (
    <>
      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Services</h2>
        <h3 className="text-xl text-center mb-12">Create Your account to get started</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={aboutImage1} alt="Service 1" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Get Started</h3>
              <p className="text-gray-600 mb-4">Ready to unleash your creativity? Join SONSFILM and connect with artists, actors, and models.</p>
              <Link to="/login" className="text-primary hover:text-primary-dark font-medium">Explore &gt;</Link>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={aboutImage3} alt="Service 2" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Hire a model</h3>
              <p className="text-gray-600 mb-4">Find the perfect model for your next project. Browse our diverse talent pool and hire with ease.</p>
              <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">Sign up &gt;</Link>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img src={aboutImage2} alt="Service 3" className="w-full h-48 object-cover"/>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">Hire a model</h3>
              <p className="text-gray-600 mb-4">Connect with talented models directly. Our platform simplifies the hiring process, putting you in control.</p>
              <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">Sign up &gt;</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">ABOUT US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Film Production</h3>
            <p className="text-gray-600 mb-4">To carry on business as film directors, script writers, and more.</p>
            <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">Sign up &gt;</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Marketing Films</h3>
            <p className="text-gray-600 mb-4">To promote, market, distribute, and exhibit films.</p>
            <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">Sign up &gt;</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Marketing Services</h3>
            <p className="text-gray-600 mb-4">To promote, market, distribute, exhibit, dub, edit, process, reprocess, duplicate, sell, and hire out films and their derivatives.</p>
            <Link to="/signup" className="text-primary hover:text-primary-dark font-medium">Sign up &gt;</Link>
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Pricing Options</h2>
        <p className="text-center text-gray-600 mb-12">Choose from a variety of pricing plans to suit your needs.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow space-y-8">
            {[
              { icon: "❤️", title: "Flexible Options", description: "Customize your membership with add-ons and upgrades." },
              { icon: "🎁", title: "Exclusive Benefits", description: "Unlock special perks and discounts with our premium plans." },
              { icon: "👥", title: "Discounted Rates", description: "Enjoy discounted rates for multiple members." }
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <span className="text-2xl">{feature.icon}</span>
                <div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <h3 className="font-bold mb-2">The SONSFILM Plan</h3>
                <p className="font-bold whitespace-nowrap">*Free</p>
                <p className="text-2xl font-bold mb-4">₦60,500 <span className="text-sm text-gray-600">/month</span></p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="mr-2">✓</span> Access to facilities</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Free starter pack</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Access to Crew membership Forms</li>
                <li className="flex items-center"><span className="mr-2">✓</span> 1-on-1 training sessions</li>
              </ul>
              <button 
                onClick={() => handleGetStarted("*Free Plan")}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Standard Plan */}
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <h3 className="font-bold mb-2">The SONSFILM Plan</h3>
                <p className="font-bold whitespace-nowrap">Standard</p>
                <p className="text-2xl font-bold mb-4">₦60,500 <span className="text-sm text-gray-600">/month</span></p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="mr-2">✓</span> Everything in Free</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Two Free starter packs</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Access to facilities</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Access to Camping-retreats</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Exclusive community access</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Priority class booking</li>
              </ul>
              <button
                onClick={() => handleGetStarted("Standard Plan")}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white p-6 rounded-lg shadow border-2 border-primary">
              <div className="text-center">
                <h3 className="font-bold mb-2">The SONSFILM Plan</h3>
                <p className="font-bold whitespace-nowrap flex items-center justify-center">
                  <span className="mr-1">💎</span> Premium
                </p>
                <p className="text-2xl font-bold mb-4">₦60,500 <span className="text-sm text-gray-600">/month</span></p>
              </div>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center"><span className="mr-2">✓</span> Everything in Regular</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Unlimited Access to facilities</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Group training sessions</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Special wellness workshops</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Personalized training plans</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Unlimited access to premium classes</li>
                <li className="flex items-center"><span className="mr-2">✓</span> Exclusive VIP events</li>
              </ul>
              <button
                onClick={() => handleGetStarted("💎Premium Plan")}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutUs;
