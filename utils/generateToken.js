import jwt from 'jsonwebtoken';
const { sign } = jwt;

// ---------------- Generate Token JWT(json web Token) ----------------
export const generateToken = (userData) => {
  let secretKey;

  switch (userData.role) {
    case "user":
      secretKey = process.env.SECRET_KEY;
      break;
    case "admin":
      secretKey = process.env.ADMIN_SECRET_KEY;
      break;
    default:
      throw new Error("Invalid user role");
  }

  return sign(userData, secretKey, { expiresIn: "6h" });
};
