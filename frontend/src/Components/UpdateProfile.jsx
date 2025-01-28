import { useState,useContext } from 'react';
import '../styles/EditProfile.css';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
const UpdateProfile = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    email: user?.email || '',
    password: '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    title: user?.title || '',
    address: user?.address || '',
  });

  const [profilePic, setProfilePic] = useState(user?.profilePic || 'profile-pic.jpg');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const previewAndUploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    // Preview the image
    const reader = new FileReader();
    reader.onload = () => setProfilePic(reader.result);
    reader.readAsDataURL(file);
    
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append('userId', user._id);
  
    // Append all fields from formData
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
  
    // Append profile picture if it's changed
    const fileInput = document.getElementById('profilePicUpload').files[0];
    if (fileInput) {
      formDataToSend.append('profilePic', fileInput);
    } else {
      // If no new profile picture is uploaded, send the current file path
      formDataToSend.append('profilePic', profilePic);
    }
  
    try {
      const { data } = await axios.put('/api/users/profile', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
        },
      });
      if (data.success) {
        toast.success('Profile updated successfully');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      
      <div className="profile-picture">
        <img id="profilePic" src={profilePic} alt="Profile Picture"/>
        <div>
          <label htmlFor="profilePicUpload" className="upload-btn">Upload New</label>
          <input 
            type="file" 
            id="profilePicUpload" 
            name='profilePicUpload'
            accept="image/*" 
            style={{display: 'none'}} 
            onChange={previewAndUploadImage}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-group">
          <label htmlFor="fullName">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            name="fullName" 
            placeholder="Enter your full name" 
            autoComplete="off" 
            value={formData.fullName} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="Enter your email" 
            value={formData.email} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter a new password" 
            value={formData.password} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input 
            type="tel" 
            id="phone" 
            name="phone" 
            required
            placeholder="Enter your phone number" 
            value={formData.phone} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            required
            placeholder="Enter your title" 
            value={formData.title} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="bio">Bio</label>
          <textarea id="bio" name="bio" rows="4" placeholder="Write a short bio about yourself" value={formData.bio} onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" rows="2" placeholder="Your Address, street no and area" value={formData.address} onChange={handleInputChange}></textarea>
        </div>

        <div className="form-group">
          <button type="submit" className="save-btn">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProfile;
