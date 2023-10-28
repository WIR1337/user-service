import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { validateInput } from "../middleware/validation.js";

const router = Router();

router.get("/users", verifyToken, ApiController.users);
router.post("/create", verifyToken, validateInput,ApiController.create);
router.put("/edit", verifyToken, ApiController.edit);

export default router;
