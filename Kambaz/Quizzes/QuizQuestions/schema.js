import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
   _id: String,
   quiz: { type: String, ref: "QuizModel" },
   title: String,
   type: String,
   points: Number,
   text: String,
   choice: [String], // it's acutally a { id, string, correctChoice }
 },
 { collection: "quizquestions" }
);
export default quizSchema;