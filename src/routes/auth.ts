import { Router } from "express";
import {
  registerUser,
  loginUser,
  addprofile,
  updateprofile,
  getprofile,
} from "../controllers/authController";

import { isAuthenticatedUser } from "../middlewares/auth";

export const router = Router();

router.post("/signup", registerUser);
router.post("/signin", loginUser);
// router.post("/info", isAuthenticatedUser, addprofile);

router
  .route("/info")
  .post(isAuthenticatedUser, addprofile)
  .put(isAuthenticatedUser, updateprofile)
  .get(isAuthenticatedUser, getprofile);
