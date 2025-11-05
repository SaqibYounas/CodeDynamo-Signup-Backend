import jwt from 'jsonwebtoken';
const { verify } = jwt;

// ---------------- Verify Token ----------------
const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token found. Please login." });
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};




export default jwtAuthMiddleware;
