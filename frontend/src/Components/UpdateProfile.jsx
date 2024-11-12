import { useState } from 'react';
import '../styles/EditProfile.css';

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    bio: ''
  });

  const [profilePic, setProfilePic] = useState('profile-pic.jpg'); // Default image path

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const previewAndUploadImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);

    // Prepare for upload
    const formData = new FormData();
    formData.append('profilePic', file);

    fetch('http://localhost:3000/upload', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => console.log('Image uploaded:', data))
    .catch(error => console.error('Error uploading file:', error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send form data to backend
    fetch('http://localhost:3000/updateProfile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => console.log('Profile updated:', data))
    .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile</h2>
      
      <div className="profile-picture">
        <img id="profilePic" src={profilePic} alt="Profile Picture"/>
        <div>
          <label htmlFor="profilePicUpload" className="upload-btn">Upload New</label>
          <input type="file" id="profilePicUpload" accept="image/*" style={{display: 'none'}} onChange={previewAndUploadImage}/>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" autoComplete="off" value={formData.fullName} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" value={formData.email} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter a new password" value={formData.password} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleInputChange} />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" rows="4" placeholder="Write a short bio about yourself" value={formData.bio} onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
