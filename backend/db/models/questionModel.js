import mongoose from "mongoose";

const answerSchema = mongoose.Schema(
  {
    option: { type: String, required: true },
    name: { type: String, required: [true, "Please add the answers"] },
  },
  {
    _id: false,
  }
);

const questionSchema = mongoose.Schema(
  {
    category_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Category",
      required: true,
    },
    name: {
      type: String,
      required: [true, "Please add the question name"],
      unique: [true, "Question already exists"],
    },
    answers: { type: [answerSchema], required: true },
    correct_answer: {
      type: String,
      required: [true, "Please add the correct answer"],
    },
  },
  {
    versionKey: false,
    timesptams: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

export default mongoose.model("Question", questionSchema);
