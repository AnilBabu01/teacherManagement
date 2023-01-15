import { Router } from "express";
import {
  addAdministration,
  getAdministration,
  updateAdministration,
  deleteAdministration,
} from "../controllers/administrationController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router
  .route("/administration")
  .post(isAuthenticatedUser, addAdministration)
  .get(isAuthenticatedUser, getAdministration)
  .delete(isAuthenticatedUser, deleteAdministration)
  .put(isAuthenticatedUser, updateAdministration);
