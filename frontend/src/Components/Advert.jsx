// Advert.jsx
import '../styles/Advert.css'; // Import your CSS file for styling

const Advert = ({ imageUrl, linkUrl, altText }) => {
    return (
        <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            <img src={imageUrl} alt={altText} className="advert-image" />
        </a>
    );
};

export default Advert;