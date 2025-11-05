import { config } from 'dotenv';
config(); 
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'; // if using Google
import User from '../models/signupSchema.js';



// ---------------- Redriect Google And Verfication By Google ----------------
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:8000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    console.log("GOOGLE PROFILE:", profile);
    const email = profile.emails[0].value.toLowerCase();

    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { googleId: profile.id }
      ]
    });
    if (existingUser) {
      console.log("User found in DB:", existingUser);
      return done(null, existingUser);
    }

    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      isVerified: profile.emails[0].verified || false 
    });

    const savedUser = await newUser.save();
    console.log("New Google User saved:", savedUser);
    return done(null, savedUser);
  } catch (err) {
    console.error("Google Strategy Error:", err);
    return done(err, null);
  }
}));
