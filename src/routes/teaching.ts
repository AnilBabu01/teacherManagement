import { Router } from "express";
import {
  addTeaching,
  getTeaching,
  updateTeaching,
  deleteTeaching,
} from "../controllers/teachtingController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router
  .route("/teaching")
  .post(isAuthenticatedUser, addTeaching)
  .get(isAuthenticatedUser, getTeaching)
  .delete(isAuthenticatedUser, deleteTeaching)
  .put(isAuthenticatedUser, updateTeaching);
