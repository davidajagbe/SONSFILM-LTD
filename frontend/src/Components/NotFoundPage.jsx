
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-96 text-center">
      <FaExclamationTriangle className="text-green-500 text-6xl mb-4" />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-5">Sorry, this page doesn't exist</p>
      <Link 
        to="/" 
        className="bg-green-700 text-white px-3 py-2 rounded-md hover:bg-green-900 transition-colors duration-300"
      >
        Back To Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
