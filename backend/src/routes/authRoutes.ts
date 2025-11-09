import express from "express";
import { registerBusiness, login } from "../controllers/authController";

const router = express.Router();

// Admin registers business
router.post("/register-business", registerBusiness);

// All roles login
router.post("/login", login);

export default router;
