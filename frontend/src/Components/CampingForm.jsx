import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CampingForm = () => {
  const [formData, setFormData] = useState({
    artistId: '',
  });

  const [files, setFiles] = useState({
    welfarePayment: null,
    premierePayment: null,
    aerobicPayment: null,
    labTest: null,
    nationalId: null,
    utilityBill: null,
    taxClearance: null,
  });
  const navigate = useNavigate();
  const [IsSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    setFiles({ ...files, [fieldName]: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    Object.keys(files).forEach((key) => {
      if (files[key]) {
        formDataToSend.append(key, files[key]);
      }
    });

    try {
      const {data} = await axios.post('/api/users/campingform', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(data.message || 'Form submitted successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form:');
    } finally {
      setIsSubmitting(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Camping Registration Form</h2>
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
          <div>
            <label htmlFor="artistId" className="block text-sm font-medium text-gray-700">
              Artist Company ID:
            </label>
            <input
              type="text"
              name="artistId"
              placeholder="Artist ID"
              onChange={handleInputChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {Object.entries(files).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block text-sm font-medium text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}:
              </label>
              <input
                type="file"
                name={key}
                onChange={(e) => handleFileChange(e, key)}
                required
                className="mt-1 block w-full px-3 py-2 text-sm text-gray-700 
                          file:mr-4 file:py-2 file:px-4 file:rounded-md
                          file:border-0 file:text-sm file:font-medium
                          file:bg-primary file:text-white
                          hover:file:bg-primary/90"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={IsSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {IsSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CampingForm;