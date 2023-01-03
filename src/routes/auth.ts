import { Router } from "express";
import {
  registerUser,
  loginUser,
  addprofile,
} from "../controllers/authController";
import { isAuthenticatedUser } from "../middlewares/auth";

export const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.post("/info", isAuthenticatedUser, addprofile);
