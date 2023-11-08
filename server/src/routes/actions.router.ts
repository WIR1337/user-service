import { Router } from "express";
import ActionsController from "../controllers/actions.controller";
import ConflictValdator from "../middleware/ConflictValdator.js";
import QueryValidator from "../middleware/QueryValidator";
const router = Router();

router.get("/", QueryValidator.get ,QueryValidator.result, ConflictValdator.get,ActionsController.get);

export default router;
