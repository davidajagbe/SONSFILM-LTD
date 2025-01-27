import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import Spinner from '../Components/Spinners';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../styles/Login.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [credentials, setCredentials] = useState({ identifier: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { identifier, password } = credentials;

        // Basic validation for identifier (email or phone)
        if (!identifier || !password) {
            toast.error("Please fill in all fields.");
            return;
        }
        
        setLoading(true);
        try {
            await login({ email: identifier, phone: identifier, password }); // Send "identifier" as email/phone
            navigate('/profile');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="identifier">Email or Phone No.</label>
                    <input
                        type="text"
                        id="identifier"
                        name="identifier"
                        placeholder="Enter your email or phone number"
                        required
                        value={credentials.identifier}
                        onChange={handleChange}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        required
                        value={credentials.password}
                        onChange={handleChange}
                    />
                    {loading ? (
                        <Spinner loading={loading} />
                    ) : (
                        <button type="submit">Login</button>
                    )}
                </form>
                <div className="form-footer">
                    <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
