import { Router } from "express";
import QueryValidator from "../middleware/QueryValidator";

const router = Router();

router.get("/", QueryValidator.get ,QueryValidator.result,(req, res) => {res.send('Hello')});

export default router;
