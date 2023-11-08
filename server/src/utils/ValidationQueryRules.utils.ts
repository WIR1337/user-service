import { query } from "express-validator";

class QueryRules {
  page() {
    return query("page", "page is required")
      .notEmpty()
      .notEmpty()
      .isNumeric()
      .withMessage("values must be a number")
      .isLength({ min: 1, max: 3 })
      .withMessage("invalid parameter");
  }
  perpage() {
    return query("perpage", "perpage is required")
      .notEmpty()
      .isNumeric()
      .withMessage("values must be a number")
      .isLength({ min: 1, max: 3 })
      .withMessage("invalid parameter");
  }
  user_id() {
    return query("user_id")
    .if(query("user_id").notEmpty())
    .isNumeric()
    .withMessage("values must be a number")
    .isLength({ min: 1, max: 3 })
    .withMessage("invalid parameter");
  }
}

export default new QueryRules();
