import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import BodyValidator from "../middleware/BodyValidator.js";

const router = Router();

router.post("/login", BodyValidator.login, AuthController.login);
router.post("/registration", BodyValidator.registration ,AuthController.registration);

export default router;
