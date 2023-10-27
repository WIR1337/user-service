import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
const router = new (Router as any)();

router.post("/login", AuthController.login);
router.post("/registration", AuthController.registration);

export default router;
