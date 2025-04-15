import mongoose from "mongoose";
const quizSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
   availableFrom: String,
   availableUntil: String,
   dueDate: String,
   points: String,
   numQuestions: String,
   score: String,
   published: String,
   description: String,
   type: String,
   group: String,
   shuffle: String,
   timeLimit: String,
   attempts: String,
   showAnswers: String,
   accessCode: String,
   oneQuestion: String,
   webcam: String,
   lock: String,
 },
 { collection: "quizzes" }
);
export default quizSchema;