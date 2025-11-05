import sendVerificationEmail from './sendEmailOTP.js'

export async function RegenerateOTP(req, res) {
    console.log("Aya email ma regnerate")
    try {
        let { email } = req.body;
        let sendEmailAgain = await sendVerificationEmail(email);
        console.log(sendEmailAgain)
        if (sendEmailAgain) {
            return res.status(200).json({ message: "OTP Again Send on your Email" });
        }
        else {
            return res.status(500).json({ message: "Server Error Signup Again !Thanks" });

        }
    } catch (error) {
        return res.status(500).json({ message: "Server Error Signup Again !Thanks" });
    }

}