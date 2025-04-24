import quizAttemptModel from "./model.js";

export const createAttempt = (attempt) =>
  quizAttemptModel.create(attempt);

export const findAttemptsByStudentAndQuiz = (studentId, quizId) =>
  quizAttemptModel.find({ studentId, quizId }).sort({ createdAt: -1 });

export const countAttempts = (studentId, quizId) =>
  quizAttemptModel.countDocuments({ studentId, quizId });

export const findLastAttempt = (studentId, quizId) =>
  quizAttemptModel.findOne({ studentId, quizId }).sort({ createdAt: -1 });
