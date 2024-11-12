import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../styles/SignupForm.css';

const SignupPage = () => {
    const { signup } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState({
        email: '',
        name: '',
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
        try {
            await signup(userInfo);
            navigate('/profile');  // Redirect after successful signup
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed. Please check your information and try again.");
        }
        if(userInfo.password !== userInfo.confirmPassword){
            alert(`Passwords do not match`)
        }
    };
    

    return (
        <div className="form-page">
            <div className="form-container">
                <h3>Join our vibrant community today!</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email or Phone No.</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email or phone number"
                        required
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="name"
                        placeholder="Enter your full name"
                        required
                        value={userInfo.nameame}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={userInfo.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        required
                        value={userInfo.confirmPassword}
                        onChange={handleChange}
                    />
                    <div className="checkbox-group">
                        <input type="checkbox" id="agree-terms" name="agree-terms" required />
                        <label htmlFor="agree-terms">
                            I agree to the <Link to="/terms" className="terms">privacy policy</Link> and terms.
                        </label>
                    </div>
                    <button type="submit" disabled={!userInfo.email || !userInfo.password || userInfo.password !== userInfo.confirmPassword}>
                        Sign Up
                    </button>
                    <div className="form-footer">
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                        <small>&copy; 2024 | All Rights Reserved</small>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
