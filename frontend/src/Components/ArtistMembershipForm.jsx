import { useState } from 'react';
import '../styles/ArtistMembershipForm.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const ArtistMembershipForm = () => {
    const howDidYouKnowOptions = [
        "Through Google",
        "Through the company worker",
        "Through an agent",
        "Through television program",
        "Through Newspaper advert",
        "Through a friend",
        "Through a colleague",
        "Through a relative",
        "Through a crew member",
        "Through church advert",
        "Through the producer",
        "Through flier advert",
        "Through Facebook",
        "Through audition advert",
        "I discovered it myself"
    ];
    
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
        howDidYouKnow:[],
        heightFt: '',
        heightInch: '',
        weight: '',
        chest: '',
        hairColor: '',
        eyeColor: '',
        inProduction: '',
        productionHouseName: '',
        position: '',
        joinedYear: '',
        producerName: '',
        producerContact: '',
        producerEmail: '',
        productionState: '',
        productionAddress: '',
        productionLandmark: '',
        movieYear: '',
        movieRole: '',
        movieName: '',
        actedYear: '',
        directorName: '',
        castName: '',
        hasId: '',
        lastVisited: '',
        leaveReasons: '',
        membershipReasons: '',
        roleType: '', // 'Actor' or 'Actress'
        termsAccepted: false,
    });

    const [files, setFiles] = useState({
        passportPicture: null,
        paymentTeller: null,
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (files) {
            setFiles((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();

        // Append text fields to FormData
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

        // Append file fields to FormData
        Object.keys(files).forEach((key) => {
            if (files[key]) {
                formDataToSend.append(key, files[key]);
            }
        });

        try {
            const { data } = await axios.post('/api/artist-membership', formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            toast.success(data.message || 'Artist Membership Form submitted successfully!');
            navigate('/profile');
        } catch (error) {
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred during submission.');
        }
    };

    return (
        <div className="form-page">
            <form onSubmit={handleSubmit} className="membership-form" encType='multipart/form-data'>
                <h2>Artist Membership Form</h2>
                {/* Section A */}
                <section>
                    <h3>Section A - Membership Form</h3>
                    <label>Registration Category:</label>
                    <div>
                        <label><input type="radio" name="registrationCategory" value="Movie" checked={formData.registrationCategory === 'Movie'} onChange={handleInputChange} /> Movie</label>
                        <label><input type="radio" name="registrationCategory" value="Music" checked={formData.registrationCategory === 'Music'} onChange={handleInputChange} /> Music</label>
                        <label><input type="radio" name="registrationCategory" value="Model" checked={formData.registrationCategory === 'Model'} onChange={handleInputChange} /> Model</label>
                    </div>
                    <label>Surname:</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleInputChange} />
                    <label>First Name:</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                    <label>Last Name:</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                    <label>Mothers Name:</label>
                    <input type="text" name="motherName" value={formData.motherName} onChange={handleInputChange} />
                    <label>Nationality:</label>
                    <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} />
                    <label>Gender:</label>
                    <select name="gender" value={formData.gender} onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <label>Date of Birth:</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                    <label>Religion:</label>
                    <input type="text" name="religion" value={formData.religion} onChange={handleInputChange} />
                    <label>Tribe:</label>
                    <input type="text" name="tribe" value={formData.tribe} onChange={handleInputChange} />
                    <label>Education Level:</label>
                    <input type="text" name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} />
                    <label>Year of Graduation:</label>
                    <input type="number" name="graduationYear" value={formData.graduationYear} onChange={handleInputChange} />
                    <label>Occupation:</label>
                    <input type="text" name="occupation" value={formData.occupation} onChange={handleInputChange} />
                    <label>Marital Status:</label>
                    <input type="text" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} />
                    <label>State of Residence:</label>
                    <input type="text" name="stateOfResidence" value={formData.stateOfResidence} onChange={handleInputChange} />
                    <label>City of Residence:</label>
                    <input type="text" name="cityOfResidence" value={formData.cityOfResidence} onChange={handleInputChange} />
                    <label>Contact Number:</label>
                    <input type="text" name="callNumber1" value={formData.callNumber1} onChange={handleInputChange} />
                    <label>WhatsApp Number:</label>
                    <input type="text" name="whatsappNumber" value={formData.whatsappNumber} onChange={handleInputChange} />
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
                    <label htmlFor="howDidYouKnow">How did you get to know the company STARS OF NIGERIA FILMS ENTERTAINMENT LIMITED ?.....</label>
                    <div>
                        {howDidYouKnowOptions.map((option, index) => (
                        <label key={index} htmlFor='howDidYouKnow'>
                        <input
                            type="radio"
                            name="howDidYouKnow"
                            value={option}
                            checked={formData.howDidYouKnow.includes(option)}
                            onChange={(e) => {
                            const { value, checked } = e.target;
                            setFormData((prev) => ({
                                ...prev,
                                howDidYouKnow: checked
                                ? [...prev.howDidYouKnow, value]
                                : prev.howDidYouKnow.filter((item) => item !== value),
                            }));
                            }}
                        />
                            {option}
                        </label>
                        ))}
                    </div>
                    <label>Passport Picture:</label>
                    <input
                        type="file"
                        name="passportPicture"
                        accept="image/*"
                        onChange={handleInputChange}
                        required
                    />
                    <label>Payment Teller:</label>
                    <input type="file" name="paymentTeller" onChange={handleInputChange} required />
                </section>

                {/* Section B */}
                <section>
                    <h3>Section B - Personal Details</h3>
                    <label>Height (ft):</label>
                    <input type="number" name="heightFt" value={formData.heightFt} onChange={handleInputChange} required/>
                    <label>Height (inches):</label>
                    <input type="number" name="heightInch" value={formData.heightInch} onChange={handleInputChange} required/>
                    <label>Weight (kg):</label>
                    <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} required/>
                    <label>Chest (cm):</label>
                    <input type="number" name="chest" value={formData.chest} onChange={handleInputChange} required/>
                    <label>Hair Color:</label>
                    <input type="text" name="hairColor" value={formData.hairColor} onChange={handleInputChange} required/>
                    <label>Eye Color:</label>
                    <input type="text" name="eyeColor" value={formData.eyeColor} onChange={handleInputChange} required/>
                </section>

                {/* Section C */}
                <section>
                    <h3>Section C - Production Information</h3>
                    <label>Are you in any movie production?</label>
                    <div>
                        <label><input type="radio" name="inProduction" value="Yes" checked={formData.inProduction === 'Yes'} onChange={handleInputChange} /> Yes</label>
                        <label><input type="radio" name="inProduction" value="No" checked={formData.inProduction === 'No'} onChange={handleInputChange} /> No</label>
                    </div>
                    <label>Production House/Industry Name:</label>
                    <input type="text" name="productionHouseName" value={formData.productionHouseName} onChange={handleInputChange} />
                    <label>Position Held:</label>
                    <input type="text" name="position" value={formData.position} onChange={handleInputChange} />
                    <label>Year you joined the production house or industry:</label>
                    <input 
                        type="date" 
                        name="joinedYear" 
                        value={formData.joinedYear} 
                        onChange={handleInputChange} 
                    />

                    <label>Name of the producer or manager in charge:</label>
                    <input 
                        type="text" 
                        name="producerName" 
                        value={formData.producerName} 
                        onChange={handleInputChange} 
                    />

                    <label>Producer or manager number:</label>
                    <input 
                        type="text" 
                        name="producerContact" 
                        value={formData.producerContact} 
                        onChange={handleInputChange} 
                    />

                    <label>Producer or manager valid email address:</label>
                    <input 
                        type="email" 
                        name="producerEmail" 
                        value={formData.producerEmail} 
                        onChange={handleInputChange} 
                    />

                    <label>State where the production house or industry is located:</label>
                    <input 
                        type="text" 
                        name="productionState" 
                        value={formData.productionState} 
                        onChange={handleInputChange} 
                    />

                    <label>Production house or industry address:</label>
                    <input 
                        type="text" 
                        name="productionAddress" 
                        value={formData.productionAddress} 
                        onChange={handleInputChange} 
                    />

                    <label>Landmark / bus stop:</label>
                    <input 
                        type="text" 
                        name="productionLandmark" 
                        value={formData.productionLandmark} 
                        onChange={handleInputChange} 
                    />

                    <label>Your position in the production house or industry:</label>
                    <input 
                        type="text" 
                        name="position" 
                        value={formData.position} 
                        onChange={handleInputChange} 
                    />

                    <label>Have you shot any movie for the production house or industry before? State the year:</label>
                    <input 
                        type="date" 
                        name="movieYear" 
                        value={formData.movieYear} 
                        onChange={handleInputChange} 
                    />

                    <label>What role did you play in the movie?</label>
                    <div>
                        <label><input type="radio" name="movieRole" value="Lead role" checked={formData.movieRole === 'Lead role'} onChange={handleInputChange} /> Lead role</label>
                        <label><input type="radio" name="movieRole" value="Supporting role" checked={formData.movieRole === 'Supporting role'} onChange={handleInputChange} /> Supporting role</label>
                        <label><input type="radio" name="movieRole" value="Waka pass" checked={formData.movieRole === 'Waka pass'} onChange={handleInputChange} /> Waka pass</label>
                    </div>

                    <label>State the name of the movies:</label>
                    <input 
                        type="text" 
                        name="movieName" 
                        value={formData.movieName} 
                        onChange={handleInputChange} 
                    />

                    <label>The year you acted in it:</label>
                    <input 
                        type="date" 
                        name="actedYear" 
                        value={formData.actedYear} 
                        onChange={handleInputChange} 
                    />

                    <label>State the name of the director who directed the movie:</label>
                    <input 
                        type="text" 
                        name="directorName" 
                        value={formData.directorName} 
                        onChange={handleInputChange} 
                    />

                    <label>Your cast name in the movie:</label>
                    <input 
                        type="text" 
                        name="castName" 
                        value={formData.castName} 
                        onChange={handleInputChange} 
                    />

                    <label>Are you in possession of the production house or company identification number?</label>
                    <div>
                        <label><input type="radio" name="hasId" value="Yes" checked={formData.hasId === 'Yes'} onChange={handleInputChange} /> Yes</label>
                        <label><input type="radio" name="hasId" value="No" checked={formData.hasId === 'No'} onChange={handleInputChange} /> No</label>
                    </div>

                    <label>When last did you visit your production house or industry?</label>
                    <input 
                        type="date" 
                        name="lastVisited" 
                        value={formData.lastVisited} 
                        onChange={handleInputChange} 
                    />

                    <label>State 5 reasons why you want to leave your production house or industry:</label>
                    <textarea 
                        name="leaveReasons" 
                        value={formData.leaveReasons} 
                        onChange={handleInputChange} 
                        rows="5"
                    ></textarea>

                    <label>State 5 reasons why you want to be a member of STARS OF NIGERIA FILMS ENTERTAINMENT LTD:</label>
                    <textarea 
                        name="membershipReasons" 
                        value={formData.membershipReasons} 
                        onChange={handleInputChange} 
                        rows="5"
                    ></textarea>
                </section>
                <section>
                    <h3>Terms and Conditions Agreement</h3>
                    
                    <label>
                        I hereby request to work with the company as: 
                    </label>
                    <div>
                        <label>
                            <input 
                                type="radio" 
                                name="roleType" 
                                value="Actor" 
                                checked={formData.roleType === 'Actor'} 
                                onChange={handleInputChange} 
                            /> Actor
                        </label>
                        <label>
                            <input 
                                type="radio" 
                                name="roleType" 
                                value="Actress" 
                                checked={formData.roleType === 'Actress'} 
                                onChange={handleInputChange} 
                            /> Actress
                        </label>
                    </div>

                    <label>
                        <input 
                            type="checkbox" 
                            name="termsAccepted" 
                            checked={formData.termsAccepted} 
                            onChange={handleInputChange} 
                        /> 
                        I agree to the 
                        <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer">  
                            Terms and Conditions
                        </a>.
                    </label>
                </section>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ArtistMembershipForm;
