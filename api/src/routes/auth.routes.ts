import { Router } from "express";
import { AuthController } from "../modules/Auth/auth.controller.js";

const authController = new AuthController();

const router = Router();
router.post('/login', authController.login);
router.get('/logout', authController.logout);

export default router;