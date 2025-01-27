import nodemailer from 'nodemailer';
import AsyncHandler from 'express-async-handler';
// import User from "../Model/UserModel.js";
import {upload} from '../middleware/MulterMiddleware.js';
// import fs from 'fs';

//Handle Script printing Form submission
export const submitScriptPrintingForm = AsyncHandler(async (req, res) => {
  const { name, email, phone, documentType, quantity, paperSize, color, comments } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
    port: process.env.MAIL_PORT, // or the appropriate port for your mail server
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.INFO_USER,
      pass: process.env.INFO_PASS,
    },
  });

  const mailOptions = {
    from: process.env.INFO_USER,
    to: process.env.REG_USER,  // Replace with your desired recipient email
    subject: 'New Script Printing Form Submission',
    html: `
      <h2>Script Printing Form Details</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Document Type:</strong> ${documentType}</p>
      <p><strong>Quantity:</strong> ${quantity}</p>
      <p><strong>Paper Size:</strong> ${paperSize}</p>
      <p><strong>Color:</strong> ${color}</p>
      <p><strong>Comments:</strong> ${comments}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Form submitted and email sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

// Handle Welfare Form Submission
export const submitWelfareForm = AsyncHandler(async (req, res) => {
  const { name, dob, address, phone, email, benefits, comments } = req.body;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
    port: process.env.MAIL_PORT, // or the appropriate port for your mail server
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.INFO_USER,
      pass: process.env.INFO_PASS,
    },
  });

  const mailOptions = {
    from: process.env.INFO_USER,
    to: process.env.REG_USER,  // Replace with your desired recipient email
    subject: 'Welfare Form Submission',
    html: `
      <h2>Welfare Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Date of Birth:</strong> ${dob}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Requested Benefits:</strong> ${benefits}</p>
      <p><strong>Additional Comments:</strong> ${comments}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Welfare request submitted and email sent successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
});

// Handle Event Form Submission
export const submitEventForm = [
  upload.fields([
    { name: 'tellerImage', maxCount: 1 },
    { name: 'passportImage', maxCount: 1 },
    { name: 'signatureImage', maxCount: 1 },
  ]),
  AsyncHandler(async (req, res) => {
    const { surname, firstName, registrationNumber, companyId, selectedEvent, amountPaid, paymentDate,passportImage,tellerImage,signatureImage } = req.body;

    const files = req.files;
    // Prepare email attachments
    const attachments = [];
    if (files && files.passportImage && files.passportImage[0]) {
      attachments.push({
        filename: files.passportImage[0].originalname,
        path: files.passportImage[0].path,
      });
    }
    if (files && files.tellerImage && files.tellerImage[0]) {
      attachments.push({
        filename: files.tellerImage[0].originalname,
        path: files.tellerImage[0].path,
      });
    }
    if (files && files.signatureImage && files.signatureImage[0]) {
      attachments.push({
        filename: files.signatureImage[0].originalname,
        path: files.signatureImage[0].path,
      });
    }

    // Add uploaded files as attachments
    if (files) {
      for (const key in files) {
        files[key].forEach(file => {
          attachments.push({
            filename: file.originalname,
            path: file.path,
          });
        });
      }
    }
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.INFO_USER,
        pass: process.env.INFO_PASS,
      },
    });

    const mailOptions = {
      from: process.env.INFO_USER,
      to: process.env.REG_USER,  // Replace with your desired recipient email
      subject: 'Event Form Submission',
      html: `
        <h2>Event Form Submission</h2>
        <p><strong>Surname:</strong> ${surname}</p>
        <p><strong>First Name:</strong> ${firstName}</p>
        <p><strong>Registration Number:</strong> ${registrationNumber}</p>
        <p><strong>Company ID:</strong> ${companyId}</p>
        <p><strong>Selected Event:</strong> ${selectedEvent}</p>
        <p><strong>Amount Paid:</strong> ${amountPaid}</p>
        <p><strong>Payment Date:</strong> ${paymentDate}</p>
        <p><strong>Teller Image:</strong> ${tellerImage}</p>
        <p><strong>Passport Image:</strong> ${passportImage}</p>
        <p><strong>Signature Image:</strong> ${signatureImage}</p>
      `,
      attachments,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Event form submitted and email sent successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
  })
];

// Handle Camping Form Submission
// Camping form submission with six file uploads
export const submitCampingForm = [
  upload.fields([
    { name: 'welfarePayment', maxCount: 1 },
    { name: 'premierePayment', maxCount: 1 },
    { name: 'aerobicPayment', maxCount: 1 },
    { name: 'labTest', maxCount: 1 },
    { name: 'nationalId', maxCount: 1 },
    { name: 'utilityBill', maxCount: 1 },
    { name: 'taxClearance', maxCount: 1 },
  ]),
  AsyncHandler(async (req, res) => {
    const { artistId } = req.body;

    // Prepare email attachments
    const attachments = [];
    const fileFields = [
      'welfarePayment',
      'premierePayment',
      'aerobicPayment',
      'labTest',
      'nationalId',
      'utilityBill',
      'taxClearance',
    ];

    fileFields.forEach((field) => {
      if (req.files[field]) {
        attachments.push({
          filename: req.files[field][0].originalname,
          path: req.files[field][0].path,
        });
      }
    });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.INFO_USER,
        pass: process.env.INFO_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.INFO_USER,
      to: process.env.REG_USER, // Replace with your desired recipient
      subject: 'Camping Form Submission',
      html: `
        <h2>Camping Form Submission</h2>
        <p><strong>Artist ID:</strong> ${artistId}</p>
      `,
      attachments, // Attach files here
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Form submitted and email sent successfully.' });
    } catch (error) {
      res.status(500).json({ message: 'Error sending email', error });
    }
  }),
];


// Handle Movie Premiere Form Submission
export const submitMoviePremiereForm = async (req, res) => {
  const { name, email, contact, movie, showtime, requests } = req.body;

  // Validate required fields are present
  if (!name || !email || !contact || !movie || !showtime) {
    return res.status(400).json({
      message: 'All required fields (name, email, contact, movie, showtime) must be filled.',
    });
  }

  // Email content setup
  const emailContent = `
    <h3>New Movie Premiere Registration</h3>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Contact:</strong> ${contact}</p>
    <p><strong>Movie:</strong> ${movie}</p>
    <p><strong>Showtime:</strong> ${showtime}</p>
    ${requests ? `<p><strong>Special Requests:</strong> ${requests}</p>` : ''}
  `;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.INFO_USER,
        pass: process.env.INFO_PASS,
      },
    });

    // Send email
    const mailOptions = {
      from: process.env.INFO_USER,
      to: process.env.REG_USER, // Replace with your desired recipient
      subject: 'New Movie Premiere Registration',
      html: emailContent,
    };

    await transporter.sendMail(mailOptions);

    // Send success response
    res.status(200).json({
      message: 'Form submission successful, and the email has been sent.',
    });
} catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
        message: 'Failed to process the form submission.',
    });
  }
};

//Handling Artist Membership Form Submission
export const submitArtistMembershipForm = [
  upload.fields([
    { name: 'passportPicture', maxCount: 1 },
    { name: 'paymentTeller', maxCount: 1 },
  ]),
  async (req, res) => {
  const formData = req.body;

  // Construct email content
  const emailContent = `
    <h3>New Artist Membership Submission</h3>
    ${Object.entries(formData)
    .map(([key, value]) => `
      <p><strong>${key}:</strong> ${Array.isArray(value) ? value.join(', ') : value}</p>
    `)
    .join('')}
  `;

  const attachments = [];
  const fileFields = ['passportPicture', 'paymentTeller'];

  // Add uploaded files as email attachments
  fileFields.forEach((field) => {
    if (req.files[field]) {
      attachments.push({
        filename: req.files[field][0].originalname,
        path: req.files[field][0].path,
      });
    }
  });

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, //company domain server mail name, e.g 'mail.companyname.com'
      port: process.env.MAIL_PORT, // or the appropriate port for your mail server
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.INFO_USER,
        pass: process.env.INFO_PASS,
      },
    });

    const mailOptions = {
      from: process.env.INFO_USER,
      to: process.env.REG_USER,
      subject: 'New Artist Membership Submission',
      html: emailContent,
      attachments,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Form submitted and email sent successfully!' });
  }catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to process the form submission.' });
  }
  },
];

