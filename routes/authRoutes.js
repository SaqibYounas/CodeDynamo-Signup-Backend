import { Router } from "express";
import passport from "passport";
import { signup, verify, googleCallback } from "../controllers/auth/signup_verify_google.js";
import {RegenerateOTP} from "../Services/regenrateCode.js"
// ---------------- Routes ----------------
const router = Router();

router.post("/signup", signup);
router.post("/verify", verify);
router.post("/regenerate-otp",RegenerateOTP);
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  googleCallback
);
export default router;
