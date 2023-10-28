import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validateInput } from "../middleware/validation.js";

const router = Router();

router.post("/login", AuthController.login);
router.post("/registration", validateInput, AuthController.registration);

export default router;
