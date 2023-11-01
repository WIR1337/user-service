import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import BodyValidator from "../middleware/validation.js";

const router = Router();

router.post("/login", BodyValidator.login(), AuthController.login);
router.post("/registration", AuthController.registration);

export default router;
