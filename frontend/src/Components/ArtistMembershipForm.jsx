import { useState } from 'react';
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

        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });

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
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8" encType='multipart/form-data'>
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Artist Membership Form</h2>

                {/* Section A */}
                <section className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Section A - Membership Form</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Registration Category:</label>
                            <div className="flex gap-4">
                                {['Movie', 'Music', 'Model'].map((category) => (
                                    <label key={category} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="registrationCategory"
                                            value={category}
                                            checked={formData.registrationCategory === category}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Surname:</label>
                            <input
                                type="text"
                                name="surname"
                                value={formData.surname}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">First Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Last Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Mothers Name:</label>
                            <input
                                type="text"
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Nationality:</label>
                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Gender:</label>
                            <select name="gender" value={formData.gender} onChange={handleInputChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50">
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Date of Birth:</label>
                            <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Religion:</label>
                            <input
                                type="text"
                                name="religion"
                                value={formData.religion}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Tribe:</label>
                            <input
                                type="text"
                                name="tribe"
                                value={formData.tribe}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Education Level:</label>
                            <input
                                type="text"
                                name="educationLevel"
                                value={formData.educationLevel}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Year of Graduation:</label>
                            <input
                                type="number"
                                name="graduationYear"
                                value={formData.graduationYear}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Occupation:</label>
                            <input
                                type="text"
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Marital Status:</label>
                            <input
                                type="text"
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State of Residence:</label>
                            <input
                                type="text"
                                name="stateOfResidence"
                                value={formData.stateOfResidence}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">City of Residence:</label>
                            <input
                                type="text"
                                name="cityOfResidence"
                                value={formData.cityOfResidence}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Contact Number:</label>
                            <input
                                type="text"
                                name="callNumber1"
                                value={formData.callNumber1}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">WhatsApp Number:</label>
                            <input
                                type="text"
                                name="whatsappNumber"
                                value={formData.whatsappNumber}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>

                        <div className="space-y-2 col-span-full">
                            <label className="block text-sm font-medium text-gray-700">How did you get to know us?</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {howDidYouKnowOptions.map((option, index) => (
                                    <label key={index} className="flex items-center">
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
                                            className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2 col-span-full">
                            <label className="block text-sm font-medium text-gray-700">Passport Picture:</label>
                            <input
                                type="file"
                                name="passportPicture"
                                accept="image/*"
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-primary/90"
                            />
                        </div>
                        <div className="space-y-2 col-span-full">
                            <label className="block text-sm font-medium text-gray-700">Payment Teller:</label>
                            <input
                                type="file"
                                name="paymentTeller"
                                onChange={handleInputChange}
                                required
                                className="mt-1 block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-primary file:text-white
                                    hover:file:bg-primary/90"
                            />
                        </div>
                    </div>
                </section>

                {/* Section B */}
                <section className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Section B - Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Height (ft):</label>
                            <input type="number" name="heightFt" value={formData.heightFt} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Height (inches):</label>
                            <input type="number" name="heightInch" value={formData.heightInch} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Weight (kg):</label>
                            <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Chest (cm):</label>
                            <input type="number" name="chest" value={formData.chest} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Hair Color:</label>
                            <input type="text" name="hairColor" value={formData.hairColor} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Eye Color:</label>
                            <input type="text" name="eyeColor" value={formData.eyeColor} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50" />
                        </div>
                    </div>
                </section>

                {/* Section C */}
                <section className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Section C - Production Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Are you in any movie production?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="inProduction"
                                        value="Yes"
                                        checked={formData.inProduction === 'Yes'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="inProduction"
                                        value="No"
                                        checked={formData.inProduction === 'No'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Production House/Industry Name:</label>
                            <input
                                type="text"
                                name="productionHouseName"
                                value={formData.productionHouseName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Position Held:</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Year you joined the production house or industry:</label>
                            <input
                                type="date"
                                name="joinedYear"
                                value={formData.joinedYear}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Name of the producer or manager in charge:</label>
                            <input
                                type="text"
                                name="producerName"
                                value={formData.producerName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Producer or manager number:</label>
                            <input
                                type="text"
                                name="producerContact"
                                value={formData.producerContact}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Producer or manager valid email address:</label>
                            <input
                                type="email"
                                name="producerEmail"
                                value={formData.producerEmail}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State where the production house or industry is located:</label>
                            <input
                                type="text"
                                name="productionState"
                                value={formData.productionState}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Production house or industry address:</label>
                            <input
                                type="text"
                                name="productionAddress"
                                value={formData.productionAddress}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Landmark / bus stop:</label>
                            <input
                                type="text"
                                name="productionLandmark"
                                value={formData.productionLandmark}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Your position in the production house or industry:</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Have you shot any movie for the production house or industry before? State the year:</label>
                            <input
                                type="date"
                                name="movieYear"
                                value={formData.movieYear}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">What role did you play in the movie?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="movieRole"
                                        value="Lead role"
                                        checked={formData.movieRole === 'Lead role'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Lead role</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="movieRole"
                                        value="Supporting role"
                                        checked={formData.movieRole === 'Supporting role'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Supporting role</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="movieRole"
                                        value="Waka pass"
                                        checked={formData.movieRole === 'Waka pass'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Waka pass</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State the name of the movies:</label>
                            <input
                                type="text"
                                name="movieName"
                                value={formData.movieName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">The year you acted in it:</label>
                            <input
                                type="date"
                                name="actedYear"
                                value={formData.actedYear}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State the name of the director who directed the movie:</label>
                            <input
                                type="text"
                                name="directorName"
                                value={formData.directorName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Your cast name in the movie:</label>
                            <input
                                type="text"
                                name="castName"
                                value={formData.castName}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">Are you in possession of the production house or company identification number?</label>
                            <div className="flex gap-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasId"
                                        value="Yes"
                                        checked={formData.hasId === 'Yes'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="hasId"
                                        value="No"
                                        checked={formData.hasId === 'No'}
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                    />
                                    <span className="ml-2 text-sm text-gray-700">No</span>
                                </label>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">When last did you visit your production house or industry?</label>
                            <input
                                type="date"
                                name="lastVisited"
                                value={formData.lastVisited}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State 5 reasons why you want to leave your production house or industry:</label>
                            <textarea
                                name="leaveReasons"
                                value={formData.leaveReasons}
                                onChange={handleInputChange}
                                rows="5"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            ></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700">State 5 reasons why you want to be a member of STARS OF NIGERIA FILMS ENTERTAINMENT LTD:</label>
                            <textarea
                                name="membershipReasons"
                                value={formData.membershipReasons}
                                onChange={handleInputChange}
                                rows="5"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            ></textarea>
                        </div>
                    </div>
                </section>
                <section className="space-y-6 mb-8">
                    <h3 className="text-xl font-semibold text-gray-800 border-b pb-2">Terms and Conditions Agreement</h3>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">I hereby request to work with the company as:</label>
                        <div className="flex gap-4">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="roleType"
                                    value="Actor"
                                    checked={formData.roleType === 'Actor'}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="ml-2 text-sm text-gray-700">Actor</span>
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="roleType"
                                    value="Actress"
                                    checked={formData.roleType === 'Actress'}
                                    onChange={handleInputChange}
                                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                                />
                                <span className="ml-2 text-sm text-gray-700">Actress</span>
                            </label>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleInputChange}
                            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label className="ml-2 block text-sm text-gray-900">
                            I agree to the
                            <a href="/terms-and-conditions" className="text-primary hover:text-primary/80 ml-1">
                                Terms and Conditions
                            </a>
                        </label>
                    </div>
                </section>

                <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ArtistMembershipForm;