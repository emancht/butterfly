
import MessageModel from "../models/MessageModel.js";
import nodemailer from 'nodemailer';
import {EMAIL_PASS, EMAIL_USER} from "../config/config.js";

export const sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new MessageModel({ name, email, subject, message });
    await newMessage.save();

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail.com',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: EMAIL_USER,
      subject: `New Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res
      .status(500)
      .json({ success: false, message: 'Failed to send the message.' });
  }
};
