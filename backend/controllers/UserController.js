import AsyncHandler from "express-async-handler";
import User from "../Model/UserModel.js";
import CookieToken from "../utils/CookieToken.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { upload } from "../middleware/MulterMiddleware.js";
import mongoose from 'mongoose';

// Temporary storage for verification codes
const verificationCodes = {};

// @desc    Send verification email
// @route   POST /api/users/verify-email
// @access  Public
const verifyEmail = AsyncHandler(async (req, res) => {
  const user = req.user;

  if (!user) {
    res.status(401);
    throw new Error('User not authenticated');
  }

  // Ensure the email in the request body matches the authenticated user's email
  const { email } = req.body; 
  if (email !== user.email) {
    res.status(400); // Bad Request
    throw new Error('Invalid email address');
  }

  const code = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
  verificationCodes[email] = code;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.REG_USER,
        pass: process.env.REG_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.REG_USER,
      to: email,
      subject: 'Verification Code',
      text:`SONSFILM LIMITED`,
      text: `Dear ${user.name}, Your verification code is ${code}. It expires in 15 minutes.`,
    });

    res.status(200).json({ message: 'Verification email sent',userId: user._id});
  } catch (error) {
    res.status(500);
    throw new Error('Failed to send verification email');
  }
});

// @desc    Verify the code sent via email
// @route   POST /api/users/verify-code
// @access  Public
const verifyCode = AsyncHandler(async (req, res) => {
  const { email, code } = req.body;

  // Check if the code exists for the email and matches the provided code
  if (verificationCodes[email] && verificationCodes[email] === parseInt(code)) {
    // Remove the verification code after successful verification
    delete verificationCodes[email];

    // Find the user associated with the provided email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Respond with success and include the user ID
    res.status(200).json({ message: 'Email verified successfully', userId: user._id });
  } else {
    res.status(400);
    throw new Error('Invalid code');
  }
});


//importing upload middleare for paymentslip upload
const uploadPaymentSlipMiddleware = upload.single('paymentSlip');
// @desc    Upload payment slip and send to admin email
// @route   POST /api/users/fees/upload-slip
// @access  Private
const uploadPaymentSlip = AsyncHandler(async (req, res) => {
  const { userId } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("Please select a file to upload.");
  }
  // Validate userId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Save file path in user schema
  user.paymentSlip = file.path;
  await user.save();

  // Send payment slip to admin email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.REG_USER,
        pass: process.env.REG_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.REG_USER,
      to: process.env.PAYMENT_USER, // Payment Admin email
      subject: "Payment Slip Uploaded",
      text: `User ${user.email} has uploaded a payment slip.Kindly review and await activation code mail to be forwarded to user (${user.email}) within 30min after confirmation of user's payment.`,
      attachments: [
        {
          filename: file.originalname,
          path: file.path,
        },
      ],
    });

    res.status(200).json({ message: "Payment slip uploaded and sent to admin successfully" });
    console.log(file);
  } catch (error) {
    res.status(500);
    throw new Error("Failed to send email to admin");
  }
}); 

// @desc    Confirm payment and activate user profile
// @route   POST /api/users/confirm-payment
// @access  Private
const confirmPayment = AsyncHandler(async (req, res) => {
  const { paymentDetails } = req.body;

  // Payment validation logic (mocked here; integrate with a payment gateway or not)
  const isValidPayment = true;

  if (!isValidPayment) {
    res.status(400);
    throw new Error('Invalid payment details');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  await user.save();

  res.status(200).json({ message: 'Payment confirmed. Profile activated.' });
});

// @desc    Generate and send OTP
// @route   POST /api/users/send-otp
// @access  Private
const sendOtp = AsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (!user.phone) {
    res.status(400);
    throw new Error('User phone number is missing');
  }
  if (!user.email) {
    res.status(400);
    throw new Error('User email is missing');
  }  
  const otp = crypto.randomInt(100000, 999999); // Generate 6-digit OTP
  user.otp = otp;
  user.otpExpires = Date.now() + 30 * 60 * 1000; // OTP valid for 30 minutes
  await user.save();//save the user with the updated otp details

  // Send OTP via email
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // e.g., 'mail.example.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.REG_USER,
        pass: process.env.REG_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.REG_USER,
      to: process.env.PAYMENT_USER, // Payment Admin email
      subject: 'OTP for Profile Activation',
      text:`SONSFILM LIMITED`,
      text: `Dear ${user.name}, Your Otp code is ${otp}. It expires in 30 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    res.status(500);
    console.error('Email sending error:', error);   
    throw new Error('Failed to send OTP. Please try again');
  }
});

// @desc    Activate profile with OTP
// @route   POST /api/users/activate-profile
// @access  Private
const activateProfile = AsyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findById(req.user._id);

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  // Validate OTP and check expiration
  if (user.otp !== otp) {
    res.status(400);
    throw new Error('Invalid OTP');
  }

  if (user.otpExpires < Date.now()) {
    res.status(400);
    throw new Error('OTP has expired');
  }

  user.otp = null; // Clear OTP after activation
  user.otpExpires = null;
  user.status = true; // Activate profile
  await user.save();

  res.status(200).json({ message: 'Profile activated successfully' });
});


// @desc        Auth User/user token
//              POST api/users/auth
// @access      public

const authUser = AsyncHandler(async (req, res) => {
    const { email,phone, password } = req.body;
    const user = await User.findOne({$or: [{email},{phone}]});
    const userPhone = await User.findOne({ phone });
    if (user || userPhone && (await user.matchPassword(password))) {
      CookieToken(res, user._id);
  
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        status: user.status,
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
    }
  });
  
  // @desc    Register a new user
  // @route   POST /api/users
  // @access  Public
  const registerUser = AsyncHandler(async (req, res) => {
    const { 
      name, 
      email,
      phone, 
      dob,
      maritalStatus,
      countryOfOrigin,
      stateOfOrigin,
      industry,
      occupation,
      address,
      registrationDate,
      password,
      confirmPassword,
      status, 
    } = req.body;
  
    const userEmailExists = await User.findOne({ email});
    const userPhoneExists = await User.findOne({ phone });

  
    if (userEmailExists || userPhoneExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      phone,
      dob,
      maritalStatus,
      countryOfOrigin,
      stateOfOrigin,
      industry,
      occupation,
      address,
      registrationDate,
      password,
      confirmPassword,
      status,
    });
  
    if (user) {
      CookieToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        status: user.status,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });
  
  // @desc    Logout user / clear cookie
  // @route   POST /api/users/logout
  // @access  Public
  const logout = AsyncHandler((req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
  });
  
  // @desc    Get user profile
  // @route   GET /api/users/profile
  // @access  Private
  const getUserProfile = AsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      // Construct the correct profile picture URL
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        dob: user.dob,
        maritalStatus: user.maritalStatus,
        countryOfOrigin: user.countryOfOrigin,
        stateOfOrigin: user.stateOfOrigin,
        industry: user.industry,
        occupation: user.occupation,
        registrationDate: user.createdAt,
        status: user.status,
        title: user.title,
        address: user.address,
        bio: user.bio,
        profilePic: user.profilePic, // Include the profilePic URL in the response
        ad: user.ad, //incluse the ad detials in the profile response
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });

  // @desc     Get all ads
  // @route    GET /api/ads
  // @access   Public 
  // const getAds = AsyncHandler(async (req, res) => {
  //   try {
  //     console.log('Fetching ads...');
  //     const ads = await User.find({ "ad.imageUrl": { $exists: true } });
  //     console.log('Ads found:', ads);
  //     const allAds = ads.map((user) => user.ad);
  //     console.log('Sending ads:', allAds);
  //     res.json(allAds);
  //   } catch (error) {
  //     console.error('Error fetching ads:', error);
  //     res.status(500).json({ message: 'Error fetching ads', error });
  //   }
  // }); 


  // @desc     send user feedback
  // @route    PUT /api/user/contact
  // @access   Public
  const sendContactForm = AsyncHandler(async (req, res) => {
    const { firstName, lastName, email, phone, feedback } = req.body;

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: true,
      auth: {
        user: process.env.REG_USER,
        pass: process.env.REG_PASS,
      },
    });

    const mailOptions = {
      from: process.env.REG_EMAIL,
      to: 'davidtemajagb@gmail.com', // Replace with your admin email address
      subject: `New Contact Form Submission from ${firstName} ${lastName}`,
      html: `
        <h2>Contact Form Details</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Feedback Type:</strong> ${feedback}</p>
      `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted successfully.' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email' });
    }
  });

  // @desc     update user details
  // @route    PUT /api/user/profile
  // @access   Private
  const updateUserProfile = AsyncHandler(async (req, res) => {  
    const { fullName, email, phone, bio, title, address,ad } = req.body;
    try {
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update fields if provided
      user.name = fullName || user.name;
      user.email = email || user.email;
      user.phone = phone || user.phone;
      user.bio = bio || user.bio;
      user.title = title || user.title;
      user.address = address || user.address;

      // If a file is uploaded, update the profile picture
      const files = req.file;
      if (!files) {
        res.status(400);
        throw new Error("Please select a file to upload.");
      }
      if(files){
        user.profilePic = files.path; // Save the filename
      }
      
      // user.profilePic = files.path;  
      // user.ad.imageUrl = files.path;

      // Update ad details (or delete if ad is null)
      user.ad = ad || { imageUrl: null, linkUrl: null, altText: null };

      await user.save();

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        user,
      });
    } 
    catch (error) {
      if (error.message === 'Only one image file is allowed for the advertisement.') {
        return res.status(400).json({ message: error.message });
      }
      console.error('Error updating profile:', error);
      res.status(500).json({ message: error.message });
    }
  });
  
  // Middleware for uploading profile picture
  // const uploadProfilePicMiddleware = upload.single('profilePic');

  // @desc     terminate user account
  // @route    DELETE /api/users/profile
  // @access   Private
  const terminateAccount = AsyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Perform account termination logic (e.g., delete user data, revoke access, etc.)
      await User.findByIdAndDelete(req.user._id); // Delete the user's account

      res.status(200).json({ message: 'Account terminated successfully' });
    } catch (error) {
      console.error('Error terminating account:', error);
      res.status(500).json({ message: 'Error terminating account' });
    }
  });


  export { 
    authUser, 
    registerUser, 
    logout, 
    getUserProfile, 
    verifyEmail,
    verifyCode,
    uploadPaymentSlipMiddleware,
    sendContactForm,
    updateUserProfile, 
    uploadPaymentSlip,
    confirmPayment,
    activateProfile,
    sendOtp,
    terminateAccount,
  };
