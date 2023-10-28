import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { validateRole } from "../middleware/role.js";

import { validateNameAndID, validateRegistration } from "../middleware/validation.js";

const router = Router();

router.get("/users", validateRole('admin'), ApiController.users);
router.post("/create", validateRole('admin'), validateRegistration,ApiController.create);
router.put("/edit", validateRole('admin'), validateNameAndID,ApiController.edit);

export default router;
