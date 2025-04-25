import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema({
  studentId: { type: String, required: true },
  courseId: { type: String, required: true },
  quizId: { type: String, required: true },
  answers: [
    {
      questionId: String,
      selectedAnswer: String,
      isCorrect: Boolean,
    }
  ],
  score: Number,
  total: Number,
  timeTaken: Number, // in seconds
  createdAt: { type: Date, default: Date.now }
});

export default quizAttemptSchema;