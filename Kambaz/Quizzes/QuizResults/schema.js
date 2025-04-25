import mongoose from "mongoose";
const { Schema } = mongoose;
const quizSchema = new mongoose.Schema({
   _id: String,
   quiz: { type: String, ref: "QuizModel"},
   user: { type: String, ref: "UserModel"},
   attempts: Number,
   lastAnswers: Object,
   lastScore: Number,
 },
 { collection: "quizresults" }
);
export default quizSchema;