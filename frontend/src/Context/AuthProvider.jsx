import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext.jsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:8000'; // Ensure this points to your backend

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (credentials) => {
    try {
      const { data } = await axios.post('/api/users/login', credentials);
      setUser(data || {}); // Ensure data is valid
      setError(null);
      setSuccess('Logged in successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to login. Please check your credentials.');
      console.error(error); // Log error for debugging
      setTimeout(() => setError(null), 3000);
    }
  };
  

  const signup = async (userInfo) => {
    try {
      const { data } = await axios.post('/api/users/signup', userInfo);
      if (data && data.user) {
        setUser(data.user);
      } else {
        setError('Invalid user data received.');
      }
      setError(null);
      setSuccess('Signed up successfully!'); // toast message on success
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to sign up. Please try again.');
    }
  };

  const terminateAccount = async () => {
    try {
      await axios.delete('/api/users/profile'); // Call the API to delete the user account
      logout(); 
      // Optionally, redirect the user to a specific page after termination
      // window.location.href = '/signup'; 
    } catch (error) {
      console.error('Error terminating account:', error);
      setError('Error terminating account:', error);
      // Handle termination error (e.g., display an error message)
    }
  };

  //sendContactForm function call to the api
  const sendContactForm = async (formData) => {
    try {
      const {data} = await axios.post('/api/contact', formData);
      setSuccess(data.message); // Log success message from the server
      // Optionally display a success message to the user (e.g., using toast)
    } catch (error) {
      setError(error.response?.data?.message);
      // Optionally display an error message to the user
    }
  };

  // Add updateProfile function here
  const updateProfile = async (updatedData) => {
    try {
      const { data } = await axios.put(
        '/api/users/profile',
        updatedData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Add token if required
          },
        }
      );
      setUser(data.user); // Update user in context
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(
        error.response?.data?.message || 'Failed to update profile. Please try again.'
      );
      toast.error('Failed to update profile.');
    }
  };

  const verifyEmail = async (email) => {
    try {
      const {data} = await axios.post('/api/users/verify-email', { email });
      setSuccess(data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send verification email.');
    }
  };
  
  const verifyCode = async (email, code) => {
    try {
      const { data } = await axios.post('/api/users/verify-code', { email, code });
      setSuccess(data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid code? Please try again!');
    }
  };

  const uploadPaymentSlip = async (formData) => {
    try {
      console.log('Uploading payment slip...', formData);
      const { data } = await axios.post('/api/users/upload-slip', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(data.message);
    } catch (error) {
      console.error('Error uploading payment slip:', error);
      setError(error.response?.data?.message || 'Failed to upload payment slip.');
    }
  };
  const confirmPayment = async (userId, paymentDetails) => {
    try {
      const { data } = await axios.post('/api/users/confirm-payment', { userId, paymentDetails });
      setSuccess(data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Invalid otp.');
    }
  };
  const sendOtp = async (userID,email,otp) =>{
    try {
      const { data } = await axios.post('/api/users/send-otp', { userID,email, otp });
      setUser({ ...user, status: true }); // Update user status in context
      setSuccess(data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Payment confirmation failed.');
    }
  }
  const activateProfile = async (userId, otp) => {
    try {
      const { data } = await axios.post('/api/users/activate-profile', { userId, otp });
      setUser({ ...user, status: true }); // Update user status in context
      setSuccess(data.message);
      toast.success(data.message); // Notify user of successful activation
    } catch (error) {
      setError(error.response?.data?.message || 'Activation failed.');
      toast.error(error.response?.data?.message || 'Activation failed.');
    }
  };
  // Function to submit the Scriptprinting form
  const handleScriptPrintingForm = async (formData) => {
    try {
      const { data } = await axios.post('/api/users/scriptprintingform', formData);
      setSuccess(data.message || 'Form submitted successfully!');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting form');
      setSuccess(null);
    }
  };

const handleWelfareForm = async (formData) => {
    try {
      const { data } = await axios.post('/api/users/welfareform', formData);
      setSuccess(data.message || 'Form submitted successfully!');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting form');
      setSuccess(null);
    }
};

const handleEventForm = async (formData, files) => {
    const formDataWithFiles = new FormData();
    Object.entries(formData).forEach(([key, value]) => formDataWithFiles.append(key, value));
    files.forEach((file) => formDataWithFiles.append(file.fieldName, file.file));

    try {
      const { data } = await axios.post('/api/users/eventform', formDataWithFiles, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(data.message || 'Form submitted successfully!');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting form');
      setSuccess(null);
    }
};

const handleCampingForm = async (formData, files) => {
  const formDataWithFiles = new FormData();
  Object.entries(formData).forEach(([key, value]) => formDataWithFiles.append(key, value));
  files.forEach((file) => formDataWithFiles.append(file.fieldName, file.file));

  try {
    const { data } = await axios.post('/api/users/campingform', formDataWithFiles, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setSuccess(data.message || 'Form submitted successfully!');
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || 'Error submitting form');
    setSuccess(null);
  }
};

const handleMoviePremiereForm = async (formData) => {
  try {
    const { data } = await axios.post('/api/users/moviepremiereform', formData);
    setSuccess(data.message || 'Form submitted successfully!');
    setError(null);
} catch (err) {
    setError(err.response?.data?.message || 'Error submitting form');
    setSuccess(null);
  }
};

const handleArtistMembershipForm = async (formData, files) => {
  const formDataWithFiles = new FormData();
  Object.entries(formData).forEach(([key, value]) => formDataWithFiles.append(key, value));
  files.forEach((file) => formDataWithFiles.append(file.fieldName, file.file));

  try {
    const { data } = await axios.post('/api/users/artistmembershipform', formDataWithFiles, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setSuccess(data.message || 'Form submitted successfully!');
    setError(null);
  } catch (err) {
    setError(err.response?.data?.message || 'Error submitting form');
    setSuccess(null);
  }
};

// // Function to fetch ads
// const fetchAds = async () => {
//   try {
//     const response = await axios.get('/api/ads'); // Fetch ads from the API
//     return response.data; // Return the fetched ad data
//   } catch (error) {
//     console.error('Error fetching ads:', error);
//     return []; // Return an empty array in case of an error
//   }
// };

const saveAd = async (formData) => {
  try {
    const response = await axios.put('/api/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Send as JSON
      },
    });

    // Update the user context with the updated ad details
    setUser(response.data.user);

    setSuccess('Ad placed successfully!');
  } catch (error) {
    console.error('Error placing ad:', error);
    setError(error.response?.data?.message || 'Failed to place ad.');
  }
};

const deleteAd = async () => { 
  try {
    const response = await axios.put('/api/users/profile', {
      ad: {
        imageUrl: null,
        linkUrl: null,
        altText: null,
      },
    });

    // Update the user in the context
    setUser(response.data); 

    setSuccess('Ad deleted successfully!');
  } catch (error) {
    console.error('Error deleting ad:', error);
    setError(error.response?.data?.message || 'Failed to delete ad.');
  }
};

  const fetchUser = async () => {
    try {
        const { data } = await axios.get('/api/users/profile');
        setUser(data || null); // Ensure data is valid
    } catch (error) {
        console.error(error); // Log error for debugging
        setUser(null);
    } finally {
        setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/users/logout');
      setUser(null);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to log out. Please try again.');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={
      { 
      user,
      setUser, // Add setUser to the context value object 
      loading, 
      error,
      success, 
      login, 
      signup,
      terminateAccount,
      sendContactForm, 
      logout,
      updateProfile,  
      verifyEmail,
      verifyCode,
      uploadPaymentSlip,
      confirmPayment,
      activateProfile,
      handleScriptPrintingForm,
      handleWelfareForm,
      handleEventForm,
      handleCampingForm,
      handleMoviePremiereForm,
      handleArtistMembershipForm,
      sendOtp,
      saveAd,
      deleteAd,
      }
    }>
      {children}
    </AuthContext.Provider>
  );

};
