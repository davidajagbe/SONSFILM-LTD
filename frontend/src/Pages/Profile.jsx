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
              <a href="#projects">Projects</a>
              <a href="#skills">Skills</a>
              <a href="#achievements">Achievements</a>
            </div>
          </>
        ) : (
          <div className="icon-links">
            <a href="#overview" title="Overview">🏠</a>
            <a href="#projects" title="Projects">🎬</a>
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
          <div className="form-container">
            <div className="crew-form"></div>
            <div className="scripti_printing-form"></div>
            <div className="camping-form"></div>
            <div className="membership-form"></div>
            <div className="welfare-form"></div>
            <div className="moviePremiere-form"></div>
          </div>
        </section>
        <section id="projects" className="section">
          <h2>Projects</h2>
          <div className="project-list">
            <ul>
              {user?.projects?.map((project, index) => (
                <li key={index}>{project.name} - {project.status}</li>
              )) || <li style={{listStyle:'none'}}>No projects available</li>}
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
