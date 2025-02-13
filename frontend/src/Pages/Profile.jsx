import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/Profile.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditIcon from '@mui/icons-material/Edit'; // Import icons from Material UI 
import AccountCircle from '@mui/icons-material/AccountCircle';
// import Advert from '../Components/Advert';
import TerminateButton from '../Components/TerminateButton';

function Profile() {
  const { user, deleteAd } = useContext(AuthContext); // Access user and setUser from AuthContext
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [showAdModal, setShowAdModal] = useState(false);
  const [adDetails, setAdDetails] = useState({
    imageUrl: '', // Store the image file
    linkUrl: '',
    altText: '',
  });

  const navigate = useNavigate();

  const status = user.status;
  useEffect(() => {
    // Log the status whenever it updates
  }, [status]);

  const handlePlaceAdClick = () => {
    setShowAdModal(true);
  };

  useEffect(() => { // Clears the file input when the modal is closed
    const imageUrlInput = document.getElementById('imageUrl');
    if (imageUrlInput) {
      imageUrlInput.value = ''; // Clear the file input
    }
  }, [showAdModal]); // Run this effect whenever showAdModal changes

  const handleAdDetailsChange = (event) => {
    const { name, value } = event.target;
    setAdDetails({ ...adDetails, [name]: value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setAdDetails({ ...adDetails, imageUrl: file }); // Update state with the image file
  };

  const handleSaveAd = async () => {
    try {
      const formData = new FormData();

      // Append the image file only if it's been selected
      if (adDetails.imageUrl) {
        formData.append('imageUrl', adDetails.imageUrl);
      }

      // Append other ad details
      formData.append('linkUrl', adDetails.linkUrl);
      formData.append('altText', adDetails.altText);

      await axios.put('/api/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowAdModal(false);
      toast.success('Ad placed successfully!');
    } catch (error) {
      console.error('Error saving ad:', error);
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleDeleteAd = async () => {
    try {
      await deleteAd();

      toast.success('Ad deleted successfully!');
    } catch (error) {
      console.error('Error deleting ad:', error);
      toast.error('Failed to delete ad.');
    }
  };

  const handleTerminateAccount = async () => {
    if (window.confirm('Are you sure you want to terminate your account? This action cannot be undone.')) {
      try {
        await axios.delete('/api/users/terminate'); // Send DELETE request to terminate endpoint
        toast.success('Account terminated successfully');
        // Redirect the user to the logout page or homepage
        navigate('/signup');
      } catch (error) {
        console.error('Error terminating account:', error);
        toast.error('Failed to terminate account');
      }
    }
  };

  return (
    user ? (
      <div className="profile">
        {/* Sidebar with Toggle */}
        <div className={`sidebar ${isSidebarExpanded ? 'expanded' : 'collapsed'}`}>
          <button className="toggle-btn" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
            {isSidebarExpanded ? '◄' : '►'}
          </button>
          {isSidebarExpanded ? (
            <>
              <h2>Profile</h2>
              <div className="profile-info">
                {<img src={user.profilePic} alt="Profile" /> || <AccountCircle size={48} />}
                <h3>{user.name}</h3>
                <p>{user.title || 'Entertainment Professional'}</p>
              </div>
              <hr />
              <div className="sidebar-links">
                <a href="#overview">Overview</a>
                <a href="#forms">forms</a>
                <a href="#advert">Adverts</a>
                <a href="#achievements">Achievements</a>
              </div>
            </>
          ) : (
            <div className="icon-links">
              <a href="#overview" title="Overview">🏠</a>
              <a href="#forms" title="forms">🎬</a>
              <a href="#advert" title="Advert">💼</a>
              <a href="#achievements" title="Achievements">🏆</a>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">
          <header className="header">
            <h1>{user?.name || "User's"} Dashboard</h1>
            <div className="header-buttons"> 
              <Link to="/editprofile" className="edit-profile-btn">
                <EditIcon size={24} /> 
                Edit Profile
              </Link>
              <TerminateButton onTerminate={handleTerminateAccount} /> 
            </div>
          </header>

          {/* Sections */}
          <section id="overview" className="section">
            <h2>Overview</h2>
            <p>{user?.overview || 'Welcome to the profile page. Discover our journey and achievements.'}</p>
            <div className="personal-info">
              <h3>Personal Information</h3>
              <p><strong>Full Name:</strong> {user?.name || user.name}</p>
              <p>
                <strong>Date of Birth:</strong>{" "}
                {user?.dob
                  ? new Date(user.dob).toDateString()
                  : "N/A"}
              </p>
              <p><strong>Email:</strong> {user?.email || user.email}</p>
              <p><strong>Phone:</strong> {user?.phone || user.phone}</p>
              <p><strong>country of Origin:</strong> {user?.countryOfOrigin || user.countryOfOrigin}</p>
              <p><strong>maritalStatus:</strong> {user?.maritalStatus || user.maritalStatus}</p>
              <p><strong>stateOfOrigin:</strong> {user?.stateOfOrigin || user.stateOfOrigin}</p>
              <p><strong>industry:</strong> {user?.industry || user.industry}</p>
              <p><strong>occupation:</strong> {user?.occupation || user.occupation}</p>
              <p><strong>Title:</strong> {user?.title || 'update your title.'}</p>
              <p><strong>Address:</strong> {user?.address || user.address}</p>
              <p><strong>Bio:</strong> {user?.bio || 'update you Bio.'}</p>
              <p>
                <strong>Registration Date:</strong>{" "}
                {user?.registrationDate
                  ? new Date(user.registrationDate).toDateString()
                  : "N/A"}
              </p> {/* Display registration date */}
            </div>
          </section>


          {/* Form section */}
          <section id="forms" className="section forms-section">
            <h2>Forms</h2>
            <div className="forms-grid">
              {[
                { title: 'Artist Membership Form', path: '/artistmembershipform', description: 'Apply for membership in our artist community.' },
                { title: 'Script Printing Form', path: '/scriptprintingform', description: 'Submit your script for professional printing services.' },
                { title: 'Welfare Form', path: '/welfareform', description: 'Access welfare resources and support.' },
                { title: 'Camping Form', path: '/campingform', description: 'Register for our upcoming camping events.' },
                { title: 'Event Form', path: '/eventform', description: 'Submit details for planning your event.' },
                { title: 'Movie Premiere Form', path: '/moviepremiereform', description: 'Organize a movie premiere with us.' },
              ].map((form, index) => (
                <div className="form-card" key={index}>
                  <h3>{form.title}</h3>
                  <p>{form.description}</p>
                  {status === true  ? (
                    <Link to={form.path} className="form-btn">Go to Form</Link>
                  ) : (
                    <button className="form-btn disabled" disabled>
                      Go to Fees Page
                    </button>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Advert Section (for activated users) */}
          {user && user.status && (
            <section id="advert" className="section">
              <h2>Advertisements</h2>
              <p>Place your ads here to promote your services.</p>
              {user.ad && user.ad.imageUrl ? ( // Check if an ad exists
                <button onClick={handleDeleteAd}>Delete Ad</button>
              ) : (
                <button onClick={handlePlaceAdClick}>Place Your Ad</button>
              )}

              {showAdModal && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close-btn" onClick={() => setShowAdModal(false)}>
                      &times;
                    </span>
                    <h2>Place Your Ad</h2>
                    <p>Ad placement costs N5000 per week. Upload your ad image below. Accepted formats: JPG, PNG. Will be placed in the homepage</p>
                    <form>
                      <div>
                        <label htmlFor="imageUrl">Image URL:</label>
                        <input
                          type="file" // Change to file input
                          id="imageUrl"
                          name="imageUrl"
                          accept="image/*"
                          multiple={false}
                          onChange={handleImageUpload}
                        />
                      </div>
                      <div>
                        <label htmlFor="linkUrl">Link URL:</label>
                        <input
                          type="text"
                          id="linkUrl"
                          name="linkUrl"
                          value={adDetails.linkUrl}
                          onChange={handleAdDetailsChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="altText">Alt Text:</label>
                        <input
                          type="text"
                          id="altText"
                          name="altText"
                          value={adDetails.altText}
                          onChange={handleAdDetailsChange}
                        />
                      </div>
                      <button type="button" onClick={handleSaveAd}>
                        Save Ad
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Achievement Component */}
          <section id="achievements" className="section">
            <h2>Achievements</h2>
            <div className="achievements-list">
              {user?.achievements?.map((achievement, index) => (
                <div key={index} className="achievement-card">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                </div>
              )) || <p>No achievements yet</p>}
            </div>
          </section>
        </div>
      </div>
    ) : (
      <navigate to="/login" />
    )  
  );
}

export default Profile;
