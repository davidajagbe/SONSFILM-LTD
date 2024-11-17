import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import '../styles/Profile.css';

function Profile() {
  const { user } = useContext(AuthContext);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
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
              <img src={user?.profilePic || 'default-pic.jpg'} alt="Profile" />
              <h3>{user?.name}</h3>
              <p>{user?.bio || 'Entertainment Professional'}</p>
            </div>
            <hr />
            <div className="sidebar-links">
              <a href="#overview">Overview</a>
              <a href="#forms">forms</a>
              <a href="#skills">Skills</a>
              <a href="#achievements">Achievements</a>
            </div>
          </>
        ) : (
          <div className="icon-links">
            <a href="#overview" title="Overview">🏠</a>
            <a href="#forms" title="forms">🎬</a>
            <a href="#skills" title="Skills">💼</a>
            <a href="#achievements" title="Achievements">🏆</a>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <h1>{user?.name || "User's"} Dashboard</h1>
          <Link to="/editprofile" className="edit-profile-btn">Edit Profile</Link>
        </header>

        {/* Sections */}
        <section id="overview" className="section">
          <h2>Overview</h2>
          <p>{user?.overview || 'Welcome to the profile page. Discover our journey and achievements.'}</p>
        </section>
        <section className='form'>
          {/* <div className="form-container">
            <li className="crew-form"></li>
            <li className="scripti_printing-form"></li>
            <li className="camping-form"></li>
            <li className="membership-form"></li>
            <li className="welfare-form"></li>
            <li className="moviePremiere-form"></li>
          </div> */}
        </section>
        <section id="forms" className="section">
          <h2>Forms</h2>
          <div className="form-list">
            <ul>
              {user?.forms?.map((form, index) => (
                <li key={index}>{form.name} - {form.status}</li>
              )) || <li style={{listStyle:'none'}}>No Forms available</li>}
            </ul>
          </div>
        </section>

        <section id="skills" className="section">
          <h2>Skills</h2>
          <div className="skills-list">
            {user?.skills?.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            )) || <p>No skills listed</p>}
          </div>
        </section>

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
  );
}

export default Profile;
