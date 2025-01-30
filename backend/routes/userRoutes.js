import express from "express";
import {
  currentUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import validateRegister from "../middlewares/validateRegister.js";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.post("/register", validateRegister, registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

export default router;
