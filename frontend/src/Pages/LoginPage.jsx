import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import '../styles/Login.css';

const LoginPage = () => {
    const { login } = useContext(AuthContext);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(credentials);
        navigate('/profile');  // Redirect after successful login
    };

    return (
        <div className="form-page">
            <div className="form-container">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email or Phone No.</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="Enter your email or phone number"
                        required
                        value={credentials.email}
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
                    <button type="submit">Login</button>
                </form>
                <div className="form-footer">
                    <p>Don’t have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
