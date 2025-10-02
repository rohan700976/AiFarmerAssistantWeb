require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const cors = require('cors');
const crypto = require('crypto');
const { spawn } = require('child_process');

const app = express();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173' }));

// Configurable URLs from .env
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Debug environment variables
console.log('MONGODB_URI:', process.env.MONGODB_URI || 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('EMAIL_USER:', process.env.EMAIL_USER || 'Not set');
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');

// Validate environment variables
if (!process.env.MONGODB_URI || !process.env.JWT_SECRET || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Error: Required environment variables are missing in .env file');
  process.exit(1);
}

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Helper: Validate email format
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// Helper: Validate password (min 8 chars)
function isValidPassword(password) {
  return password.length >= 8;
}

// Helper: Generate OTP (6-digit)
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  verificationOTP: String, // For login verification if not verified
  verificationOTPExpiry: Date, // OTP expiry time
  resetToken: String,
  resetTokenExpiry: Date,
});
const User = mongoose.model('User', userSchema);

// Activity Schema
const activitySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: String,
  timestamp: { type: Date, default: Date.now },
});
activitySchema.index({ userId: 1, timestamp: -1 });
const Activity = mongoose.model('Activity', activitySchema);

// SensorReading Schema
const sensorReadingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  temperature: { type: Number, required: true },
  humidity: { type: Number, required: true },
  moisture: { type: Number, required: true },
  npk: {
    n: { type: Number },
    p: { type: Number },
    k: { type: Number },
  },
  timestamp: { type: Date, default: Date.now },
});
sensorReadingSchema.index({ userId: 1, timestamp: -1 });
const SensorReading = mongoose.model('SensorReading', sensorReadingSchema);

// Middleware for JWT authentication
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.userId = decoded.userId;
    next();
  });
};

// Get User Profile
app.get('/api/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('name email');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid email or password (min 8 chars)' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationOTP = generateOTP();
    const verificationOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationOTP,
      verificationOTPExpiry,
    });
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - AI Farmer Assistant',
      html: `<p>Your verification code is <strong>${verificationOTP}</strong>. Please enter this code on the website to verify your account. This code expires in 10 minutes.</p>`,
    }).catch(err => console.error('Email send error:', err));

    await Activity.create({ userId: user._id, action: 'Signed up' });
    res.status(201).json({ message: 'User created. Check your email for verification code.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Verify OTP (for signup or login)
app.post('/api/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  if (!isValidEmail(email) || !otp) {
    return res.status(400).json({ message: 'Invalid email or OTP' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    if (user.verificationOTP !== otp || user.verificationOTPExpiry < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.verificationOTP = null;
    user.verificationOTPExpiry = null;
    await user.save();

    await Activity.create({ userId: user._id, action: 'Email verified' });
    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Resend Verification OTP
app.post('/api/resend-verification', async (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.isVerified) return res.status(400).json({ message: 'Email already verified' });

    const verificationOTP = generateOTP();
    user.verificationOTP = verificationOTP;
    user.verificationOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Email - AI Farmer Assistant',
      html: `<p>Your new verification code is <strong>${verificationOTP}</strong>. Please enter this code on the website to verify your account. This code expires in 10 minutes.</p>`,
    }).catch(err => console.error('Email send error:', err));

    await Activity.create({ userId: user._id, action: 'Resent verification email' });
    res.json({ message: 'Verification code resent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login with OTP Verification
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!isValidEmail(email) || !isValidPassword(password)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    if (!user.isVerified) {
      const verificationOTP = generateOTP();
      user.verificationOTP = verificationOTP;
      user.verificationOTPExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
      await user.save();

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Verify Your Login - AI Farmer Assistant',
        html: `<p>Your verification code is <strong>${verificationOTP}</strong>. Please enter this code on the website to complete your login. This code expires in 10 minutes.</p>`,
      }).catch(err => console.error('Email send error:', err));

      return res.status(403).json({ message: 'Email not verified. Check your email for verification code.' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    await Activity.create({ userId: user._id, action: 'Logged in' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Forgot Password
app.post('/api/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!isValidEmail(email)) return res.status(400).json({ message: 'Invalid email' });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetUrl = `${FRONTEND_URL}/auth/reset-password?token=${resetToken}&email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Reset Your Password - AI Farmer Assistant',
      html: `<p>Reset your password by clicking <a href="${resetUrl}">here</a>.</p>`,
    }).catch(err => console.error('Email send error:', err));

    await Activity.create({ userId: user._id, action: 'Requested password reset' });
    res.json({ message: 'Password reset email sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset Password
app.post('/api/reset-password', async (req, res) => {
  const { email, resetToken, newPassword } = req.body;
  if (!isValidEmail(email) || !isValidPassword(newPassword)) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  try {
    const user = await User.findOne({ email, resetToken, resetTokenExpiry: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    await Activity.create({ userId: user._id, action: 'Password reset' });
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Log Activity
app.post('/api/log-activity', async (req, res) => {
  const { userId, action } = req.body;
  try {
    await Activity.create({ userId, action });
    res.json({ message: 'Activity logged' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Activities
app.get('/api/activities', authenticateToken, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(50); // Limit for performance
    // Filter out login, signup, and resent verification email activities
    const filteredActivities = activities.filter(activity => 
      !['Logged in', 'Signed up', 'Resent verification email'].includes(activity.action)
    );
    res.json(filteredActivities);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});;

// Post Sensor Data
app.post('/api/sensor-data', authenticateToken, async (req, res) => {
  const { temperature, humidity, moisture } = req.body;
  if (!temperature || !humidity || !moisture || isNaN(temperature) || isNaN(humidity) || isNaN(moisture)) {
    return res.status(400).json({ message: 'Invalid sensor values for temperature, humidity, or moisture' });
  }
  try {
    const npk = await estimateNPK(temperature, humidity, moisture);

    const reading = new SensorReading({
      userId: req.userId,
      temperature,
      humidity,
      moisture,
      npk,
    });
    await reading.save();

    await Activity.create({ userId: req.userId, action: 'Added sensor reading' });
    res.status(201).json({ message: 'Sensor data stored', reading });
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Get Sensor Data
app.get('/api/sensor-data', authenticateToken, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 1; // Default to 1 for latest, optional limit for more
    const readings = await SensorReading.find({ userId: req.userId })
      .sort({ timestamp: -1 })
      .limit(limit > 100 ? 100 : limit); // Cap at 100 for performance
    res.json(readings);
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// Estimate NPK
async function estimateNPK(temperature, humidity, moisture) {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [
      'path/to/your/xgboost_model.py', // Update with actual path to your XGBoost script
      temperature.toString(),
      humidity.toString(),
      moisture.toString(),
    ]);

    let output = '';
    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) return reject(`Python process exited with code ${code}`);
      try {
        const result = JSON.parse(output);
        resolve(result);
      } catch (err) {
        reject('Invalid JSON from Python script: ' + err.message);
      }
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
    });
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));