import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { verifyToken } from "../middleware/auth.js";
import { validateNameAndID, validateRegistration } from "../middleware/validation.js";

const router = Router();

router.get("/users", verifyToken, ApiController.users);
router.post("/create", verifyToken, validateRegistration,ApiController.create);
router.put("/edit", verifyToken, validateNameAndID,ApiController.edit);

export default router;
