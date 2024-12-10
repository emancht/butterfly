

// controllers/userController.js

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {JWT_KEY} from "../config/config.js";
import UserModel from "../models/userModel.js";

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ status: 'success', message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ status: 'fail', message: 'Invalid credentials' });
    }

    const token = jwt.sign({ email }, JWT_KEY, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ email }, JWT_KEY, { expiresIn: '15d' });

    res.cookie('Token', refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.status(200).json({ status: 'success', token });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
};

export const LogOut = (req, res) => {
  res.clearCookie('Token');
  res.status(200).json({ status: 'success', message: 'Logged out successfully' });
};
