import { useState } from 'react';
import { toast } from 'react-toastify'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/EventForm.css'; // Assuming you separate styling

const EventForm = () => {
    const [formData, setFormData] = useState({
        surname: '',
        firstName: '',
        registrationNumber: '',
        companyId: '',
        selectedEvent: '',
        amountPaid: '',
        paymentDate: '',
        tellerImage: null,
        passportImage: null,
        signatureImage: null,
    });

    const events = [
        "Orphanage home visitation",
        "Widows visitation",
        "Widower visitation",
        "Birthday ceremony",
        "Hospital visitation",
        "Prison visitation",
        "Wedding/ marriage",
        "Welfare",
        "Company Anniversary",
        "Lunching",
        "Sonfilms night",
        "Child Naming ceremony",
        "Child dedication",
        "Movie premiere Ticket",
        "Sonfilms night Ticket",
        "Coronation Ticket",
    ];

    const [isSubmitting,setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const [passportImage, setPassportImage] = useState(null);
    const [tellerImage, setTellerImage] = useState(null);
    const [signatureImage, setSignatureImage] = useState(null);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e, fieldName) => {
        const file = e.target.files[0];
        if (fieldName === 'passportImage') setPassportImage(file);
        if (fieldName === 'tellerImage') setTellerImage(file);
        if (fieldName === 'signatureImage') setSignatureImage(file);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Append files to FormData
    if (passportImage) formDataToSend.append('passportImage', passportImage);
    if (tellerImage) formDataToSend.append('tellerImage', tellerImage);
    if (signatureImage) formDataToSend.append('signatureImage', signatureImage);

    try {
        const { data } = await axios.post('/api/users/eventform', formDataToSend,{
        headers: {"Content-Type": "multipart/form-data"},
        });
        toast.success(data.message ||'Form submitted successfully!');
        navigate('/profile');
        console.log([...formDataToSend]);
    } catch (error) {
        toast.error(error.response?.data?.message ||'Error submitting form');
    }
    finally{
        setIsSubmitting(true)
    }
  };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Event Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <label htmlFor='surname'>Surname:</label>
                    <input 
                        type="text" 
                        name="surname" 
                        value={formData.surname} 
                        onChange={handleInputChange} 
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                    <label htmlFor='firstName'>First Name:</label>
                    <input 
                        type="text" 
                        name="firstName" 
                        value={formData.firstName} 
                        onChange={handleInputChange} 
                        required
                    />
                    <label htmlFor='registrationNumber'>Registration Number:</label>
                    <input 
                        type="text" 
                        name="registrationNumber" 
                        value={formData.registrationNumber} 
                        onChange={handleInputChange} 
                        required
                    />
                    <label htmlFor='companyId'>Company ID Card Number:</label>
                    <input 
                        type="text" 
                        name="companyId" 
                        value={formData.companyId} 
                        onChange={handleInputChange} 
                        required
                    />
                    <label htmlFor='selectedEvent'>Select the event you are donating for:</label>
                    <select 
                        name="selectedEvent" 
                        value={formData.selectedEvent} 
                        onChange={handleInputChange} 
                        required
                    >
                        <option value="">-- Select an Event --</option>
                        {events.map((event, index) => (
                            <option key={index} value={event}>{event}</option>
                        ))}
                    </select>
                    <label htmlFor='amountPaid'>Amount Paid:</label>
                    <input 
                        type="number" 
                        name="amountPaid" 
                        value={formData.amountPaid} 
                        onChange={handleInputChange} 
                        required
                    />
                    <label htmlFor='paymentDate'>Date of Payment:</label>
                    <input 
                        type="date" 
                        name="paymentDate" 
                        value={formData.paymentDate} 
                        onChange={handleInputChange} 
                        required
                    />
                    <label htmlFor='tellerImage'>Teller:</label>
                    <input 
                        type="file" 
                        name="tellerImage" 
                        onChange={(e) => handleFileChange(e, 'tellerImage')} 
                        required
                    />
                    <label htmlFor='passportImage'>Passport:</label>
                    <input 
                        type="file" 
                        name="passportImage" 
                        onChange={(e) => handleFileChange(e, 'passportImage')} 
                        required
                    />
                    <label htmlFor='signatureImage'>Signature:(Please attach a copy of your esignature)</label>
                    <input 
                        type="file" 
                        name="signatureImage" 
                        onChange={(e) => handleFileChange(e, 'signatureImage')} 
                        required
                    />

                    <button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EventForm;
