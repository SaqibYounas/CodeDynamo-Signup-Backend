import jwt from "jsonwebtoken";
import { RESPONSE_MESSAGES } from "../constants/jwt.js";
import {STATUS_CODES} from '../../constants/statusCodes.js'

const { verify } = jwt;

// ---------------- Verify Token ----------------
const jwtAuthMiddleware = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(STATUS_CODES.UNAUTHORIZED)
      .json({ message: RESPONSE_MESSAGES.TOKEN_MISSING });
  }

  try {
    const decoded = verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(STATUS_CODES.FORBIDDEN)
      .json({ message: RESPONSE_MESSAGES.TOKEN_INVALID });
  }
};

export default jwtAuthMiddleware;
