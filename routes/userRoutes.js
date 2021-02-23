import express from "express";
const router = express.Router();
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  adminUpdateUser,
  authUser,
  getProfile,
  getUserByID,
  getUsers,
  registerUser,
  removeUser,
  updateUserProfile,
} from "../controller/userController.js";

router.route("/").post(registerUser).get(protect,admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getProfile)
  .put(protect, updateUserProfile);
router.route('/:id').delete(protect,admin,removeUser).put(protect,admin,adminUpdateUser).get(protect,admin,getUserByID);

export default router;
