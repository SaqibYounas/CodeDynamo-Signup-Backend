import signupModule from '../../models/signupSchema.js';
const { User } = signupModule;

// ---------------- Check Email Existing ----------------
export const checkEmail = async (req, res) => {
  try {
    const { emailkey } = req.body;

    const user = await User.findOne({ email: emailkey });

    if (!user) {
      return res.status(200).json({ exists: false, message: "Not registered Email! Please Signup." });
    }
    if (user.googleId) {
      return res.status(200).json({
        exists: true,
        googleAccount: true,
        message: "This user is registered via Google. Please set a website password first.",
      });
    }
    return res.status(200).json({
      exists: true,
      googleAccount: false,
      message: "Email Found",
    });

  } catch (error) {
    console.error("checkEmail error:", error);
    return res.status(500).json({
      exists: false,
      message: "Server error. Try Again!",
    });
  }
};

