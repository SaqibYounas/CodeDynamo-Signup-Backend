import mongoose from "mongoose";
import User from "./signupSchema.js";
import dotenv from "dotenv";
dotenv.config();

const url = "";

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    updateAdminPassword();
  })
  .catch((err) => console.error("Connection error:", err));

async function updateAdminPassword() {
  const email = "admincodedynamo@gmail.com";
  const plainPassword = "admin321";

  try {
    const user = await User.findOne({ email });

    if (!user) {
      console.log("❌ Admin user not found");
      return;
    }

    user.password = plainPassword; // plain text — let pre-save middleware hash it
    user.isPasswordSet = true;

    await user.save();
    console.log("✅ Admin password updated successfully");
  } catch (err) {
    console.error("❌ Error updating password:", err);
  } finally {
    mongoose.connection.close();
  }
}
