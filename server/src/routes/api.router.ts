import { Router } from "express";
import ApiController from "../controllers/api.controller.js";
import { validateRole } from "../middleware/RoleValidator.js";

import BodyValidator from "../middleware/BodyValidator.js";
import ConflictValdator from "../middleware/ConflictValdator.js";


const router = Router();

router.get("/users", validateRole('admin'), ApiController.users);
router.post("/create", validateRole('admin'), BodyValidator.registration,BodyValidator.result,ConflictValdator.create,ApiController.create);
router.put("/update", validateRole('admin'), BodyValidator.update ,BodyValidator.result,ConflictValdator.update,ApiController.update);

export default router;
