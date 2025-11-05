import User from '../models/signupSchema.js';

// ---------------- updateEmail----------------
async function updateMails(email) {
    try {
        const result = await User.updateOne({ email }, { isVerified: true });

        if (result.modifiedCount === 1 || result.nModified === 1) {
            console.log(`✅ Email updated: ${email}`);
            return "ok";
        } else {
            console.log(`⚠️ Email not updated: ${email}`);
            return "email not found or already verified";
        }

    } catch (err) {
        console.error("❌ Error verifying email:", err.message);
        return "server error mail verified";
    }
}

export default updateMails;
