import { Router } from "express";
import {
  addResearch,
  getResearch,
  updateResearch,
  deleteResearch,
} from "../controllers/researchController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router
  .route("/research")
  .post(isAuthenticatedUser, addResearch)
  .get(isAuthenticatedUser, getResearch)
  .delete(isAuthenticatedUser, deleteResearch)
  .put(isAuthenticatedUser, updateResearch);
