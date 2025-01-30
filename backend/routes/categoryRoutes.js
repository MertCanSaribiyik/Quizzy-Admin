import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} from "../controllers/categoryController.js";
import validateToken from "../middlewares/validateToken.js";

const router = express.Router();

router.use(validateToken);
router.get("/", getAllCategories).post("/", createCategory);
router
  .get("/:id", getCategory)
  .put("/:id", updateCategory)
  .delete("/:id", deleteCategory);

export default router;
