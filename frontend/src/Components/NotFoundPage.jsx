import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import '../styles/NotFoundPage.css';

function NotFoundPage() {
  return (
    <section className="notfound-page">
      <FaExclamationTriangle className="icon" />
      <h1 className="title">404 Not Found</h1>
      <p className="message">This page does not exist</p>
      <Link to="/" className="back-link">
        Go Back
      </Link>
    </section>
  );
}

export default NotFoundPage;
