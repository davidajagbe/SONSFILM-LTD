import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ScriptPrinting.css';
import { toast } from 'react-toastify';


const ScriptPrintingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        documentType: '',
        quantity: 1,
        paperSize: '',
        color: '',
        comments: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const { data } = await axios.post('/api/users/scriptprintingform', formData);
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
                <h3>Script Printing Request Form</h3>
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

                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
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

                    <label htmlFor="documentType">Document Type</label>
                    <select
                        id="documentType"
                        name="documentType"
                        value={formData.documentType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Document Type</option>
                        <option value="business-cards">Business Cards</option>
                        <option value="brochures">Brochures</option>
                        <option value="flyers">Flyers</option>
                        <option value="posters">Posters</option>
                        <option value="custom">Custom</option>
                    </select>

                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        min="1"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="paperSize">Paper Size</label>
                    <select
                        id="paperSize"
                        name="paperSize"
                        value={formData.paperSize}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Paper Size</option>
                        <option value="a4">A4</option>
                        <option value="a3">A3</option>
                        <option value="letter">Letter</option>
                        <option value="legal">Legal</option>
                    </select>

                    <label htmlFor="color">Color Option</label>
                    <select
                        id="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Color Option</option>
                        <option value="black-white">Black & White</option>
                        <option value="full-color">Full Color</option>
                    </select>

                    <label htmlFor="comments">Additional Comments</label>
                    <textarea
                        name="comments"
                        rows="4"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Any additional instructions..."
                    ></textarea>

                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Request'} 
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ScriptPrintingForm;
