import { Router } from "express";
import {
  addqualification,
  getqualifications,
  deletegetqualification,
  updatequalification,
} from "../controllers/qualificationController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router
  .route("/qualification")
  .post(isAuthenticatedUser, addqualification)
  .get(isAuthenticatedUser, getqualifications)
  .delete(isAuthenticatedUser, deletegetqualification)
  .put(isAuthenticatedUser, updatequalification);
