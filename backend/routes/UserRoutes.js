import express from 'express';
import {
  authUser,
  registerUser,
  logout,
  getUserProfile,
  verifyEmail,
  verifyCode,
  uploadPaymentSlipMiddleware, 
  uploadPaymentSlip,
  sendContactForm,    
  updateUserProfile, 
  // uploadProfilePicMiddleware,
  confirmPayment,
  activateProfile,
  sendOtp,
  terminateAccount,
  // uploadAdImage,
} from '../controllers/UserController.js';
import { 
  submitScriptPrintingForm,
  submitWelfareForm,
  submitEventForm,
  submitCampingForm,
  submitMoviePremiereForm,
  submitArtistMembershipForm

 } from '../controllers/FormController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validateForm } from '../middleware/ValidateMiddleware.js';
import {upload} from '../middleware/MulterMiddleware.js';

const router = express.Router();

router.route('/signup').post(registerUser);
router.route('/login').post(authUser);
router.route('/logout').post(logout);

//for sending user feedback through mail
router.post('/contact', sendContactForm); 

// Profile (requires authentication)
router.route('/profile').get(protect, getUserProfile).put(upload.single('profilePic'),upload.single('imageUrl'),updateUserProfile).delete(terminateAccount);
  

// routes for verification and payment
router.route('/verify-email').post(protect,verifyEmail);
router.route('/verify-code').post(protect,verifyCode);
router.route("/upload-slip").post(uploadPaymentSlipMiddleware, uploadPaymentSlip);
router.route('/confirm-payment').post(protect, confirmPayment);
router.route('/send-otp').post(protect, sendOtp);
router.route('/activate-profile').post(protect, activateProfile);

// router.route('/ads')
//   .get(getAds); // Fetch all ads to display on the homepage

//routes for Submitting form data
router.route('/scriptprintingform').post(protect,validateForm,submitScriptPrintingForm);
router.route('/welfareform').post(protect,submitWelfareForm);
router.route('/eventform').post(protect,submitEventForm);
router.route('/campingform').post(protect,submitCampingForm);
router.route('/moviepremiereform').post(protect,submitMoviePremiereForm);
router.route('/artistmembershipform').post(protect,submitArtistMembershipForm);


export default router;
