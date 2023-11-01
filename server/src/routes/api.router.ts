import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { validateRole } from "../middleware/role.js";

import BodyValidator from "../middleware/validation.js";

const router = Router();

router.get("/users", validateRole('admin'), ApiController.users);
router.post("/create", validateRole('admin'),BodyValidator.registration(),ApiController.create);
router.put("/edit", validateRole('admin'),BodyValidator.edit(),ApiController.edit);

export default router;
