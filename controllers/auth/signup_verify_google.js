// import updateMails from '../../Services/updateMailDB.js';
// import { generateToken } from '../../utils/generateToken.js';
// import client from '../../config/redis-client.mjs';
// import User from '../../models/signupSchema.js';
// import checkEmailDomain from "../../utils/validators.js"
// import sendVerificationEmail from '../../Services/sendEmailOTP.js'
// import signupDataSaveDB from "./signupSaveDB.js"

// // ---------------- SIGNUP ----------------
// export const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     const emailKey = email.toLowerCase();

//     const existingUser = await User.findOne({ email: emailKey });
//     if (existingUser) {
//       return res.status(409).json({ message: 'Email already exists. Try logging in.' });
//     }

//     const isValidDomain = await checkEmailDomain(emailKey);
//     if (!isValidDomain) {
//       return res.status(400).json({ message: 'Invalid email domain' });
//     }

//     const emailSent = await sendVerificationEmail(emailKey);
//     if (!emailSent) {
//       return res.status(400).json({ message: 'Email not sent. Use valid domain' });
//     }

//     await client.json.set(emailKey, "$", { name, email: emailKey, password });
//     await client.expire(emailKey, 1000);

//     return res.status(200).json({ message: 'Verification code sent. Check inbox' });
//   } catch (err) {
//     console.error("Signup Error:", err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// export const verify = async (req, res) => {
//   try {
//     const { email, code } = req.body;
//     const emailKey = email?.toLowerCase();

//     if (!emailKey || !code) {
//       return res.status(400).json({ message: "❌ Email or Code missing." });
//     }

//     const userData = await client.json.get(emailKey);
//     const storedCode = await client.get(`verify:${emailKey}`);

//     if (!userData) {
//       return res.status(400).json({ message: "❌ User not found or expired." });
//     }

//     if (!storedCode) {
//       return res.status(401).json({ message: "❌ Code expired or not sent." });
//     }

//     if (String(storedCode).trim() !== String(code).trim()) {
//       return res.status(401).json({ message: "Code is not matched" });
//     }

//     const existingUser = await User.findOne({ email: userData.email });
//     if (existingUser) {
//       return res.status(409).json({ message: "⚠️ Email already exists" });
//     }

//     const saved = await signupDataSaveDB(userData);

//     const updated = await updateMails(saved.email);

//     const token = generateToken({
//       id: saved.id,
//       role: saved.role,
//       name: saved.name,
//       email: saved.email,
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       secure: process.env.NODE_ENV === "production",
//       maxAge: 21600000, // 6 hours
//     });

//     if (saved.id && updated === "ok") {
//       await client.del(emailKey);
//       await client.del(`verify:${emailKey}`);
//       return res.status(200).json({ message: "✅ Email verified successfully!" });
//     } else {
//       return res.status(500).json({ message: "❌ Error during saving or update" });
//     }
//   } catch (err) {
//     console.error("Verify Error:", err);
//     return res.status(500).json({ error: err.message });
//   }
// };

// // ---------------- Google Login/Signup ----------------

// export const googleCallback = (req, res) => {
//   try {
//     if (!req.user) return res.status(400).json({ error: "User not found" });


//     const token = generateToken({
//       id: req.user._id,
//       role:req.user.role,
//       name: req.user.name,
//       email: req.user.email
//     });

//     console.log("redirec")
//     res.cookie("token", token, {
//       httpOnly: true, secure: process.env.NODE_ENV === "production",
//       sameSite: "strict", maxAge: 21600000
//     });
//     res.redirect("http://localhost:5173/user/dashboard");
//   } catch (err) {
//     console.error("Callback Error:", err);
//     res.status(500).json({ error: "Google login failed" });
//   }
// };




// // const { checkEmailDomain, User } = require('../models/signup');
// // const sendVerificationEmail = require('../config/mail');
// // const signups = require('../models/signup').signups;
// // const updateMails = require('../models/updateMail');
// // const logins = require('../models/login').default;
// // const {  generateToken } = require('../config/jwt').default;
// // const connectRedis = require('../config/redis-client').default;


import updateMails from '../../Services/updateMailDB.js';
import { generateToken } from '../../utils/generateToken.js';
import client from '../../config/redis-client.mjs';
import User from '../../models/signupSchema.js';
import checkEmailDomain from "../../utils/validators.js";
import sendVerificationEmail from '../../Services/sendEmailOTP.js';
import signupDataSaveDB from "./signupSaveDB.js";
import { RESPONSE_MESSAGES,  } from '../../constants/messages.js';
import {STATUS_CODES} from '../../constants/statusCodes.js'
// ---------------- SIGNUP ----------------
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailKey = email.toLowerCase();

    const existingUser = await User.findOne({ email: emailKey });
    if (existingUser) {
      return res.status(STATUS_CODES.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_EXISTS });
    }

    const isValidDomain = await checkEmailDomain(emailKey);
    if (!isValidDomain) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.INVALID_EMAIL_DOMAIN });
    }

    const emailSent = await sendVerificationEmail(emailKey);
    if (!emailSent) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.EMAIL_NOT_SENT });
    }

    await client.json.set(emailKey, "$", { name, email: emailKey, password });
    await client.expire(emailKey, 1000);

    return res.status(STATUS_CODES.OK).json({ message: RESPONSE_MESSAGES.VERIFICATION_SENT });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(STATUS_CODES.SERVER_ERROR).json({ error: err.message });
  }
};

// ---------------- VERIFY ----------------
export const verify = async (req, res) => {
  try {
    const { email, code } = req.body;
    const emailKey = email?.toLowerCase();

    if (!emailKey || !code) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.EMAIL_OR_CODE_MISSING });
    }

    const userData = await client.json.get(emailKey);
    const storedCode = await client.get(`verify:${emailKey}`);

    if (!userData) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({ message: RESPONSE_MESSAGES.USER_NOT_FOUND_OR_EXPIRED });
    }

    if (!storedCode) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: RESPONSE_MESSAGES.CODE_EXPIRED });
    }

    if (String(storedCode).trim() !== String(code).trim()) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json({ message: RESPONSE_MESSAGES.CODE_NOT_MATCHED });
    }

    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(STATUS_CODES.CONFLICT).json({ message: RESPONSE_MESSAGES.EMAIL_ALREADY_EXISTS });
    }

    const saved = await signupDataSaveDB(userData);
    const updated = await updateMails(saved.email);

    const token = generateToken({
      id: saved.id,
      role: saved.role,
      name: saved.name,
      email: saved.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 21600000, // 6 hours
    });

    if (saved.id && updated === "ok") {
      await client.del(emailKey);
      await client.del(`verify:${emailKey}`);
      return res.status(STATUS_CODES.OK).json({ message: RESPONSE_MESSAGES.EMAIL_VERIFIED });
    } else {
      return res.status(STATUS_CODES.SERVER_ERROR).json({ message: RESPONSE_MESSAGES.SAVE_UPDATE_ERROR });
    }
  } catch (err) {
    console.error("Verify Error:", err);
    return res.status(STATUS_CODES.SERVER_ERROR).json({ error: err.message });
  }
};

// ---------------- Google Login/Signup ----------------
export const googleCallback = (req, res) => {
  try {
    if (!req.user) return res.status(STATUS_CODES.BAD_REQUEST).json({ error: RESPONSE_MESSAGES.USER_NOT_FOUND });

    const token = generateToken({
      id: req.user._id,
      role: req.user.role,
      name: req.user.name,
      email: req.user.email,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 21600000,
    });

    res.redirect("http://localhost:5173/user/dashboard");
  } catch (err) {
    console.error("Callback Error:", err);
    res.status(STATUS_CODES.SERVER_ERROR).json({ error: RESPONSE_MESSAGES.GOOGLE_LOGIN_FAILED });
  }
};
