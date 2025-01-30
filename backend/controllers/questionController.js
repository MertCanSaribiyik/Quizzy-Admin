import asyncHandler from "express-async-handler";
import Question from "../db/models/questionModel.js";
import Category from "../db/models/categoryModel.js";

//@desc Get all questions
//@route GET /api/question
//@access private
const getAllQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find().populate("category_id");
  res.json(questions);
});

//@desc Create question
//@route POST /api/question
//@access private
const createQuestion = asyncHandler(async (req, res) => {
  const { category_id, name, answers, correct_answer } = req.body;

  if (!category_id || !name || !answers || !correct_answer) {
    res.statusCode = 400;
    throw new Error("All fields are mandatory");
  }

  const categoryAvailable = await Category.findById(category_id);

  if (!categoryAvailable) {
    res.statusCode = 404;
    throw new Error("Category not found");
  }

  const question = await Question.create({
    category_id,
    name,
    answers: [
      { option: "A", name: answers[0] },
      { option: "B", name: answers[1] },
      { option: "C", name: answers[2] },
      { option: "D", name: answers[3] },
    ],
    correct_answer,
  });

  res.status(201).json({ message: "Question successfully created" });
});

//@desc Get questions by category
//@route GET /api/question/category
//@access private
const getQuestionByCategory = asyncHandler(async (req, res) => {
  const categoryId = req.query.category_id;
  const categoryAvailable = await Category.findById(categoryId);

  if (!categoryAvailable) {
    res.statusCode = 404;
    throw new Error("Category not found");
  }

  const question = await Question.find({
    category_id: categoryId,
  }).populate("category_id");

  res.json(question);
});

//@desc Get question
//@route GET /api/question/:id
//@access private
const getQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id).populate(
    "category_id"
  );

  if (!question) {
    res.statusCode = 404;
    throw new Error("Question not found");
  }

  res.json(question);
});

//@desc Update question
//@route PUT /api/question/:id
//@access private
const updateQuestion = asyncHandler(async (req, res) => {
  const { category_id, name, answers, correct_answer } = req.body;

  if (!category_id || !name || !answers || !correct_answer) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  const categoryAvailable = await Category.findById(category_id);

  if (!categoryAvailable) {
    res.status(404);
    throw new Error("Category not found");
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    {
      category_id,
      name,
      answers: [
        { option: "A", name: answers[0] },
        { option: "B", name: answers[1] },
        { option: "C", name: answers[2] },
        { option: "D", name: answers[3] },
      ],
      correct_answer,
    },
    { new: true }
  );

  if (!updatedQuestion) {
    res.status(404);
    throw new Error("Question not found");
  }

  res.json(updatedQuestion);
});

//@desc Delete question
//@route DELETE /api/question/:id
//@access private
const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findByIdAndDelete(req.params.id);

  if (!question) {
    res.status(404);
    throw new Error("Question not found");
  }

  res.json({ message: "Question successfully deleted" });
});

export {
  getAllQuestions,
  createQuestion,
  getQuestionByCategory,
  getQuestion,
  updateQuestion,
  deleteQuestion,
};
