import mongoose from "mongoose";
import quizAttemptSchema from "./schema.js";

const quizAttemptModel = mongoose.model("QuizAttempt", quizAttemptSchema);
export default quizAttemptModel;