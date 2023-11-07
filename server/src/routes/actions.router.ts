import { Router } from "express";
import ActionsController from "../controllers/actions.controller";
import QueryValidator from "../middleware/QueryValidator";

const router = Router();

router.get("/", QueryValidator.get ,QueryValidator.result, ActionsController.get);

export default router;
