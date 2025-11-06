import sendVerificationEmail from './sendEmailOTP.js';
import { MESSAGES } from '../constants/regenerateCode.js';
import { STATUS_CODES } from '../constants/statusCodes.js';

export async function RegenerateOTP(req, res) {
  console.log("Aya email ma regenerate");

  try {
    const { email } = req.body;
    const sendEmailAgain = await sendVerificationEmail(email);

    console.log(sendEmailAgain);

    if (sendEmailAgain) {
      return res
        .status(STATUS_CODES.OK)
        .json({ message: MESSAGES.SUCCESS });
    } else {
      return res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: MESSAGES.SERVER_ERROR });
    }

  } catch (error) {
    console.error("Error in RegenerateOTP:", error);
    return res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: MESSAGES.SERVER_ERROR });
  }
}
