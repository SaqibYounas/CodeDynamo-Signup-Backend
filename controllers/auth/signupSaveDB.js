import User from "../../models/signupSchema.js"

// ---------------- SAVE USER DATA IN DATABASE ----------------
const signupDataSaveDB = async (data) => {
  try {
    const { name, email, password } = data;

    const newUser = new User({ name, email, password });
    newUser.isPasswordSet = true; 
    const savedUser = await newUser.save();
   console.log("data save db")
    return {
      id: savedUser._id,
      role:savedUser.role,
      name: savedUser.name,
      email: savedUser.email
    };

  } catch (error) {
    console.log("Error saving user:", error.message);
    return null; 
  }
};

export default signupDataSaveDB;