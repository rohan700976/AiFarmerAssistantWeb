require('dotenv').config({ path: 'D:/manthan/AiFarmerAssistantWeb/backend_db/.env' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: 'test@example.com', // Replace with your email (e.g., sangampal586@gmail.com)
  subject: 'Test Email - AI Farmer Assistant',
  text: 'This is a test email.',
}).then(() => console.log('Email sent successfully')).catch(err => console.error('Email error:', err.message));