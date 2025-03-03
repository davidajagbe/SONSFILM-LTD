import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import adminProfile from '../assets/adminprofile.jpg';
import Spinner from '../Components/Spinners';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/SignupForm.css';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userInfo, setUserInfo] = useState({
        email: '',
        phone: '',
        name: '',
        dob: '',
        maritalStatus: '',
        countryOfOrigin: '',
        stateOfOrigin: '',
        industry: '',
        occupation: '',
        address: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signup(userInfo);
            navigate('/profile');  // Redirect after successful signup
        } catch (error) {
            console.error("Signup failed:", error);
            toast.error(error.response?.data?.message||"Signup failed. Please check your information and try again.");
        }
        finally {
            setLoading(false);
        }
        if(userInfo.password !== userInfo.confirmPassword){
            toast.error(`Passwords do not match`)
        }
    };
    

    return (
        <div className="signup-container">
            <div className="signup-form-section">
                <h1>Sign Up</h1>
                <p>Join our vibrant community today!</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                    id="email" 
                    name="email" 
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={handleChange} 
                    required />

                    <label htmlFor="phone">Phone</label>
                    <input type="tel" 
                    id="phone" 
                    name="phone" 
                    placeholder="Enter your phone number" 
                    value={userInfo.phone}
                    onChange={handleChange}
                    required
                    />

                    <label htmlFor="name">Name</label>
                    <input type="text" 
                    id="name" 
                    name="name" 
                    placeholder="Enter your name" 
                    required 
                    value={userInfo.name}
                    onChange={handleChange}
                    />

                    <label htmlFor="dob">Date of Birth</label>
                    <input type="date"
                    id="dob"
                    name="dob"
                    placeholder="Enter your date of birth"
                    value={userInfo.dob}
                    onChange={handleChange}
                    required
                    />

                    <label htmlFor="industry">Name of Industry</label>
                    <input type="text" 
                    id="industry" 
                    name="industry" 
                    placeholder="Enter your Industry Name" 
                    required 
                    value={userInfo.industry}
                    onChange={handleChange}
                    />

                    <label htmlFor="countryOfOrigin">Country of origin</label>
                    <input type="text" 
                    id="countryOfOrigin" 
                    name="countryOfOrigin" 
                    placeholder="Enter your country of origin" 
                    required 
                    value={userInfo.countryOfOrigin}
                    onChange={handleChange}
                    />

                    <label htmlFor="stateOfOrigin">State of origin</label>
                    <input type="text" 
                    id="stateOfOrigin" 
                    name="stateOfOrigin" 
                    placeholder="" 
                    required 
                    value={userInfo.stateOfOrigin}
                    onChange={handleChange}
                    />

                    <label htmlFor="maritalStatus">Marital Status</label>
                    <input type="text" 
                    id="maritalStatus" 
                    name="maritalStatus" 
                    placeholder="Single or Married?" 
                    required 
                    value={userInfo.maritalStatus}
                    onChange={handleChange}
                    />

                    <label htmlFor="occupation">Occupation</label>
                    <input type="text" 
                    id="occupation" 
                    name="occupation" 
                    placeholder="Enter your Occupation" 
                    required 
                    value={userInfo.occupation}
                    onChange={handleChange}
                    />

                    <label htmlFor="address">Address</label>
                    <textarea name="address" 
                    id="address"
                    rows="3"
                    required
                    placeholder="Enter your Address"
                    value={userInfo.address}
                    onChange={handleChange}
                    ></textarea>

                    <label htmlFor="password">Password</label>
                    <input type="password" 
                    id="password" 
                    name="password" 
                    placeholder="Enter your password"
                    value={userInfo.password}
                    onChange={handleChange}
                    required />
                    
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" 
                    id="confirmPassword" 
                    name="confirmPassword" 
                    placeholder="Confirm entered password"
                    value={userInfo.confirmPassword}
                    onChange={handleChange} 
                    required />

                    <div className="signup-checkbox-group">
                        <label htmlFor="agree-terms" >
                            <input type="checkbox" name="agree-terms" required />
                            <p></p>I agree to the <Link to="/terms-and-conditions" className="terms">privacy policy</Link> and terms.
                        </label>
                        <label htmlFor="consent-terms">
                            <input type="checkbox" id="consent-terms" name="consent-terms" required />
                            I consent to receive marketing emails.
                        </label>
                    </div>  
                    {loading ? 
                    (
                        <Spinner loading={loading} />
                    ) :
                    (
                        <button type="submit" 
                        disabled={
                            !userInfo.email || !userInfo.password || userInfo.password !== userInfo.confirmPassword
                        }>
                            Sign Up
                        </button>
                    )}
                </form>
                <p>
                    Already have an account? <Link to='/login'>Log In</Link>
                </p>
            </div>
            <div className="signup-intro-section">
                {/* Company Intro Section */}
                <div className="signup-intro-card">
                    <img src={adminProfile} alt="Admin" className="admin-image" />
                    <h2>Stars of Nigeria Films Entertainment Ltd</h2>
                    <p>The Home of Movies, Modeling & Music.</p>
                    <p>
                        At Stars of Nigeria Films Entertainment Ltd, we&apos;re passionate about fostering creativity and talent in the entertainment industry. 
                        We provide a platform for artists, actors, and models to connect, collaborate, and showcase their skills to the world.
                    </p><br />
                    <p>Join our vibrant community and let&apos;s create amazing stories together!</p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
