const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const nodemailer = require('nodemailer');
const todoRoutes = require('./routes/todoRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Configure Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can change this to another service if needed
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password for Gmail
  },
});

app.post('/send-email', async (req, res) => {
  const {task} = req.body;

  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Task Added - Todo App',
    text: `You have added a new task: "${task}"\n\nAdded on: ${new Date().toLocaleString()}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${process.env.EMAIL_USER} for task: "${task}"`);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to local MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
