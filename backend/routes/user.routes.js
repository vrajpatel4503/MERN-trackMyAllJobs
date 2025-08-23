import express from "express";
import {
  deleteUserAccountController,
  getUserDetailsController,
  updateEmailController,
  updatePhoneNumberController,
  userLoginController,
  userLogoutController,
  userRegistrationController,
} from "../controllers/user.controllers.js";
import { userFieldValidationMiddleware } from "../middleware/user.validation.js";
import upload from "../multer/multer.js";
import { verifyUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Routes : User Registration
router.post(
  "/register",
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  userFieldValidationMiddleware,
  userRegistrationController
);

// Routes : User Login
router.post("/login", userLoginController);

// Routes : User Logout
router.get("/logout", verifyUser, userLogoutController);

// Routes : User get details
router.get("/get-user-details", verifyUser, getUserDetailsController);

// Routes : Update the email
router.put("/update-email", verifyUser, updateEmailController);

// Routes : Update User Email
router.put("/update-phonenumber", verifyUser, updatePhoneNumberController);

// Routes : Delete User
router.delete("/delete-user-account", verifyUser, deleteUserAccountController);

export default router;
