import { Router } from "express";
import AuthController from "./AuthController.js";
const router = new (Router as any)();

router.get("/login", AuthController.login);
router.get("/registration", AuthController.registration);

export default router;
