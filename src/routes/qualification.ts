import { Router } from "express";
import {
  addqualification,
  getqualifications,
} from "../controllers/qualificationController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router
  .route("/qualification")
  .post(isAuthenticatedUser, addqualification)
  .get(isAuthenticatedUser, getqualifications);
