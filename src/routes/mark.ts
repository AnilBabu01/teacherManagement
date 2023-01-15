import { Router } from "express";
import { addMark } from "../controllers/markController";
import { isAuthenticatedUser } from "../middlewares/auth";
export const router = Router();

router.route("/marks").post(isAuthenticatedUser, addMark);

//   .get(isAuthenticatedUser, getTeaching)
//   .delete(isAuthenticatedUser, deleteTeaching)
//   .put(isAuthenticatedUser, updateTeaching);
