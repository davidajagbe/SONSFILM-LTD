import { useState } from 'react';
import '../styles/ArtistMembershipForm.css';
import { Link } from 'react-router-dom';

const ArtistMembershipForm = () => {
    const [formData, setFormData] = useState({
        registrationCategory: 'Movie',
        surname: '',
        firstName: '',
        lastName: '',
        motherName: '',
        nationality: '',
        gender: '',
        dateOfBirth: '',
        religion: '',
        tribe: '',
        educationLevel: '',
        graduationYear: '',
        occupation: '',
        maritalStatus: '',
        stateOfResidence: '',
        cityOfResidence: '',
        callNumber1: '',
        whatsappNumber: '',
        email: '',
        address: '',
        landmark: '',
        lga: '',
        nationalId: '',
        taxNumber: '',
        howDidYouKnow: [],
        teller: null,
        passport: null,
        // Section B
        heightFt: '',
        heightInch: '',
        weight: '',
        chest: '',
        hairColor: '',
        eyeColor: '',
        // Section C
        inProduction: '',
        joinedYear: '',
        productionHouseName: '',
        producerName: '',
        producerContact: '',
        producerEmail: '',
        productionState: '',
        productionAddress: '',
        productionLandmark: '',
        position: '',
        movies: [],
        membershipReasons: [],
        leaveReasons: [],
        termsAccepted: false,
        paymentTeller: null,
        passportPicture: null,
        signedEmail: '',
        submissionDate: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleArrayChange = (e, fieldName, index) => {
        const updatedArray = [...formData[fieldName]];
        updatedArray[index] = e.target.value;
        setFormData((prev) => ({
            ...prev,
            [fieldName]: updatedArray,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form submission logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="form-page">
            <form onSubmit={handleSubmit} className="membership-form">
                <h2>Artist Membership Form</h2>
                <section>
                    <h3>Section A - Membership Form</h3>
                    <label>Registration Category:</label>
                    <div>
                        <label><input type="radio" name="registrationCategory" value="Movie" checked={formData.registrationCategory === 'Movie'} onChange={handleChange} /> Movie</label>
                        <label><input type="radio" name="registrationCategory" value="Music" checked={formData.registrationCategory === 'Music'} onChange={handleChange} /> Music</label>
                        <label><input type="radio" name="registrationCategory" value="Model" checked={formData.registrationCategory === 'Model'} onChange={handleChange} /> Model</label>
                    </div>
                    <label>Surname:</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} />

                    {/* Repeat similar structure for other fields */}
                    <label>How did you get to know about us?</label>
                    <div className="howDidYouKnow-group">
                        <input type="checkbox" name="howDidYouKnow" id='howDidYouKnow' value="Google" onChange={handleChange} />
                        <label htmlFor="howDidYouKnow">
                            Google
                        </label>
                        <input type="checkbox" name="howDidYouKnow2" id='howDidYouKnow2' value="Company Worker" onChange={handleChange} />
                        <label htmlFor="howDidYouKnow2">
                            Company Worker
                        </label>
                        {/* Repeat for other options */}
                        <label>Other:</label>
                        <input type="text" name="howDidYouKnowOther" value={formData.howDidYouKnowOther || ''} onChange={handleChange} />
                    </div>
                    <label htmlFor='teller'>Teller:</label>
                    <input type="file" name="teller" id='teller' onChange={handleChange} />
                </section>

                <section>
                    <h3>Section B - Personal Details</h3>
                    <label>Height (ft):</label>
                    <input type="number" name="heightFt" value={formData.heightFt} onChange={handleChange} />

                    <label>Weight (kg):</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleChange} />

                    {/* Repeat similar structure for other fields in Section B */}
                </section>

                <section>
                    <h3>Section C - Production Information</h3>
                    <label>Are you in any movie production or industry?</label>
                    <div>
                        <label><input type="radio" name="inProduction" value="Yes" checked={formData.inProduction === 'Yes'} onChange={handleChange} /> Yes</label>
                        <label><input type="radio" name="inProduction" value="No" checked={formData.inProduction === 'No'} onChange={handleChange} /> No</label>
                    </div>
                    
                    <label>Name of Production House:</label>
                    <input type="text" name="productionHouseName" value={formData.productionHouseName} onChange={handleChange} />
                    
                    {/* Repeat similar structure for other fields in Section C */}
                    <h3>Agreement</h3>
                    <div className="checkbox-group">
                        <input type="checkbox" id="agree-terms" name="agree-terms" required />
                        <label htmlFor="agree-terms">
                            I agree to the <Link to="/terms" className="terms">privacy policy</Link> and terms.
                        </label>
                    </div>
                </section>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ArtistMembershipForm;
