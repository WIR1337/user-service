import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { validateRegistration } from "../middleware/validation.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/registration", validateRegistration, AuthController.registration);
router.get("/users", verifyToken, AuthController.users);

export default router;
