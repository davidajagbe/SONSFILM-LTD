import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-green-800 text-white px-6 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-green-200 transition-colors">SONSFILM</Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-green-200 transition-colors">Home</Link>
          <Link to="/about" className="hover:text-green-200 transition-colors">About</Link>
          <Link to="/events" className="hover:text-green-200 transition-colors">Events</Link>
          <Link to="/contact" className="hover:text-green-200 transition-colors">Contact</Link>
          {user ? (
            <>
              <Link to="/profile" className="hover:text-green-200 transition-colors">Profile</Link>
              <button 
                onClick={handleLogout} 
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-green-200 transition-colors">Login</Link>
              <Link 
                to="/signup" 
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;