import express from "express";
import { registerBusiness, login } from "../controllers/authController";

const router = express.Router();

router.post("/register-business", registerBusiness);
router.post("/login", login);

export default router;