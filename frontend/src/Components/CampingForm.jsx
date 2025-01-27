import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../styles/CampingForm.css';

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
  const [IsSubmitting,setIsSubmitting] = useState(false);
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

    // Append files to FormData
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
      toast.success(data.message ||'Form submitted successfully!');
      navigate('/profile');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error submitting form:');
    }
    finally{
      setIsSubmitting(true)
  }
  };

  return (
    <div className="camping-form-page">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className='camping-form-container'>
        <label  htmlFor='artistId'>Artist Company ID:</label>
        <input
          type="text"
          name="artistId"
          placeholder="Artist ID"
          onChange={handleInputChange}
          required
        />
        <label  htmlFor='welfarePayment'>Welfare Payment slip:</label>
        <input
          type="file"
          name="welfarePayment"
          onChange={(e) => handleFileChange(e, 'welfarePayment')}
          required
        />
        <label  htmlFor='premierePayment'>Movie Premiere Payment slip:</label>
        <input
          type="file"
          name="premierePayment"
          onChange={(e) => handleFileChange(e, 'premierePayment')}
          required
        />
        <label  htmlFor='aerobicPayment'>Aerobic Payment Slip:</label>
        <input
          type="file"
          name="aerobicPayment"
          onChange={(e) => handleFileChange(e, 'aerobicPayment')}
          required
        />
        <label  htmlFor='labTest'>labTest:</label>
        <input
          type="file"
          name="labTest"
          onChange={(e) => handleFileChange(e, 'labTest')}
          required
        />
        <label  htmlFor='nationalId'>NationalId:</label>
        <input
          type="file"
          name="nationalId"
          onChange={(e) => handleFileChange(e, 'nationalId')}
          required
        />
        <label  htmlFor='utilityBill'>Utility Bill:</label>
        <input
          type="file"
          name="utilityBill"
          onChange={(e) => handleFileChange(e, 'utilityBill')}
          required
        />
        <label  htmlFor='taxClearance'>Tax Clearance:</label>
        <input
          type="file"
          name="taxClearance"
          onChange={(e) => handleFileChange(e, 'taxClearance')}
          required
        />
        <button type="submit" disabled={IsSubmitting}>
          {IsSubmitting ? 'Submitting' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default CampingForm;
