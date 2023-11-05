import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { validateRole } from "../middleware/RoleValidator.js";

import BodyValidator from "../middleware/BodyValidator.js";

const router = Router();

router.get("/users", validateRole('admin'), ApiController.users);
router.post("/create", validateRole('admin'),BodyValidator.registration(),ApiController.create);
router.put("/update", validateRole('admin'),BodyValidator.update(),ApiController.update);

export default router;
