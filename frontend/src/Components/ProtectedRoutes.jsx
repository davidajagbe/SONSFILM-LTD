import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { ClipLoader } from 'react-spinners';

const ProtectedRoute = ({ children, redirectTo = "/login", activateRedirectTo}) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <ClipLoader color="#36d7b7" size={50} />
      </div>
    );
  }

  // Check if user is not logged in (user is null or undefined)
  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  // Only redirect users with false status to the activation page for form routes
  if (user.status === false && activateRedirectTo) {
    return <Navigate to={activateRedirectTo} />;
  }

  return children;
};

export default ProtectedRoute;
