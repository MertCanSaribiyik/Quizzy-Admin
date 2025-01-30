import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getAllQuestions,
  getQuestion,
  getQuestionByCategory,
  updateQuestion,
} from "../controllers/questionController.js";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use(validateToken);
router.get("/", getAllQuestions).post("/", createQuestion);
router.get("/category", getQuestionByCategory);
router
  .get("/:id", getQuestion)
  .put("/:id", updateQuestion)
  .delete("/:id", deleteQuestion);

export default router;
