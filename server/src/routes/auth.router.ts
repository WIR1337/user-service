import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validateLogin, validateRegistration } from "../middleware/validation.js";

const router = Router();

router.post("/login", validateLogin, AuthController.login);
router.post("/registration", validateRegistration, AuthController.registration);

export default router;
