import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ClipLoader } from 'react-spinners';

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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleLocation = (location) => {
    setShowFullLocations((prevState) => ({
      ...prevState,
      [location]: !prevState[location],
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const {data} = await axios.post('/api/users/contact', formData);
      toast.success(data.message);
    } catch (error) {
      toast.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Get in Touch</h1>
          <p className="text-center text-gray-600 mb-8">Have a question? We're here to help.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <select
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select One...</option>
              <option value="general">General Inquiry</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
            </select>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center justify-center"
            >
              Send
              {isSubmitting && <ClipLoader size={18} color="#f9f9f9" className="ml-2" />}
            </button>
          </form>
        </div>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Customer Reviews</h2>
        <p className="text-center text-gray-600 mb-8">What our customers are saying...</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat vel sunt minus sed doloribus omnis!</p>
            <h4 className="font-bold mb-4">Lance Jarvis</h4>
            <div className="flex space-x-4">
              <i className="fa fa-facebook text-gray-600"></i>
              <i className="fa fa-twitter text-gray-600"></i>
              <i className="fa fa-linkedin text-gray-600"></i>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo officiis optio quo, possimus iste eos natus.</p>
            <h4 className="font-bold mb-4">Ericka Lynda</h4>
            <div className="flex space-x-4">
              <i className="fa fa-facebook text-gray-600"></i>
              <i className="fa fa-twitter text-gray-600"></i>
              <i className="fa fa-linkedin text-gray-600"></i>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam doloribus in dolorem, optio rerum ducimus.</p>
            <h4 className="font-bold mb-4">Neil Wilford</h4>
            <div className="flex space-x-4">
              <i className="fa fa-facebook text-gray-600"></i>
              <i className="fa fa-twitter text-gray-600"></i>
              <i className="fa fa-linkedin text-gray-600"></i>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-white py-16 px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Meet Us at Our Locations</h1>
        <p className="text-center text-gray-600 mb-8">Find a location near you</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "LAGOS STATE OFFICE",
              address: "16b Ayanleye street, off info street, 2nd junction, Ogba, IKEJA, LAGOS STATE NIGERIA",
              location: "lagos"
            },
            {
              title: "OGUN STATE OFFICE",
              address: "27 salami ojerinde street, ola - ore bus stop AGBADO, OGUN STATE NIGERIA",
              location: "ogun"
            },
            {
              title: "ABIA STATE OFFICE",
              address: "Stars Of Nigeria Films Entertainment Road. Ubakala, umuahia ABIA STATE NIGERIA",
              location: "abia"
            }
          ].map((office, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow transform transition duration-300 hover:scale-105">
              <h2 className="text-xl font-bold mb-4">{office.title}</h2>
              <p className="text-gray-600 mb-4">
                {showFullLocations[office.location] ? office.address : `${office.address.substring(0, 30)}...`}
              </p>
              <Link
                to="#"
                onClick={() => handleToggleLocation(office.location)}
                className="text-primary hover:text-primary-dark font-medium"
              >
                {showFullLocations[office.location] ? "View Less" : "View Location"}
              </Link>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
};

export default Contact;