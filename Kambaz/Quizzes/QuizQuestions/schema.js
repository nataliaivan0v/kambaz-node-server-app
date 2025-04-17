import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
   _id: String,
   quiz: { type: String, ref: "QuizModel" },
   title: String,
   type: String,
   points: Number,
   text: String,
   choices: [String],
   correct_answer_index: Number
 },
 { collection: "quizquestion" }
);
export default quizSchema;