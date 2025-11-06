import signupModule from '../../models/signupSchema.js';
import { RESPONSE_MESSAGES } from '../../constants/messages.js';
import { STATUS_CODES } from '../../constants/statusCodes.js';

const { User } = signupModule;

// ---------------- Check Email Existing ----------------
export const checkEmail = async (req, res) => {
  try {
    const { emailkey } = req.body;
    const user = await User.findOne({ email: emailkey });

    if (!user) {
      return res.status(STATUS_CODES.OK).json({
        exists: false,
        message: RESPONSE_MESSAGES.EMAIL_NOT_FOUND,
      });
    }

    if (user.googleId) {
      return res.status(STATUS_CODES.OK).json({
        exists: true,
        googleAccount: true,
        message: RESPONSE_MESSAGES.GOOGLE_ACCOUNT,
      });
    }

    return res.status(STATUS_CODES.OK).json({
      exists: true,
      googleAccount: false,
      message: RESPONSE_MESSAGES.EMAIL_FOUND,
    });

  } catch (error) {
    console.error("checkEmail error:", error);
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      exists: false,
      message: RESPONSE_MESSAGES.SERVER_ERROR,
    });
  }
};
