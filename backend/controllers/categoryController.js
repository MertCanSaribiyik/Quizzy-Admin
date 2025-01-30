import asyncHandler from "express-async-handler";
import Category from "../db/models/categoryModel.js";

//@desc Get all categories
//@route GET /api/category
//@access private
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

//@desc Create categories
//@route POST /api/category
//@access private
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    throw new Error("All fields are mandatory");
  }

  await Category.create({ name });
  res.status(201).json({ message: "Category successfully created" });
});

//@desc Get category
//@route GET /api/category/:id
//@access private
const getCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.statusCode = 404;
    throw new Error("Category not found");
  }

  res.json(category);
});

//@desc Update category
//@route PUT /api/category/:id
//@access private
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;
    throw new Error("All fields are mandatory");
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    { name },
    { new: true }
  );

  if (!updatedCategory) {
    res.statusCode = 404;
    throw new Error("Category not found");
  }

  res.json(updatedCategory);
});

//@desc Delete category
//@route DELETE /api/category/:id
//@access private
const deleteCategory = asyncHandler(async (req, res) => {
  const deletedCategory = await Category.findByIdAndDelete(req.params.id);

  if (!deletedCategory) {
    res.statusCode = 404;
    throw new Error("Category not found");
  }

  res.json(deletedCategory);
});

export {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
