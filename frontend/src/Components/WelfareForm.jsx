import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/WelfareForm.css';
const WelfareForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        address: '',
        phone: '',
        email: '',
        benefits: '',
        comments: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const [isSubmitting,setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/welfareform', formData);
          toast.success(data.message ||'Form submitted successfully!');
          navigate('/profile');
        } catch (error) {
          toast.error(error.response?.data?.message ||'Error submitting form');
        }
        finally{
            setIsSubmitting(true)
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Welfare Form</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="benefits">Requested Benefits</label>
                    <select
                        id="benefits"
                        name="benefits"
                        value={formData.benefits}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Benefit Type</option>
                        <option value="financial-assistance">Financial Assistance</option>
                        <option value="healthcare">Healthcare Support</option>
                        <option value="food-support">Food Support</option>
                        <option value="housing-support">Housing Support</option>
                        <option value="education-support">Education Support</option>
                    </select>

                    <label htmlFor="comments">Additional Comments</label>
                    <textarea
                        id="comments"
                        name="comments"
                        rows="4"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Any additional information..."
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Submitting...' : 'Submit Request'}</button>
                </form>
            </div>
        </div>
    );
};

export default WelfareForm;
