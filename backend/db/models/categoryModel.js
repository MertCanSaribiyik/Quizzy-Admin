import mongoose from "mongoose";
import Question from "./questionModel.js";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the category name"],
      unique: [true, "Category already exists"],
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

//This middleware works when a delete request is sent to the category model.
//Thus, when a category is deleted, all questions containing the category are deleted.
categorySchema.pre("findOneAndDelete", async function (next) {
  const categoryId = this.getQuery()._id;
  await Question.deleteMany({ category_id: categoryId });
  next();
});

export default mongoose.model("Category", categorySchema);
