import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export function findAllQuizzes() {
  return model.find();
}

export function findQuizzesForCourse(courseId) {
  return model.find({ course: courseId });
}

export function findQuizById(quizId) {
  return model.find({ _id: quizId });
}

export function createQuiz(quiz) {
  const newAssignment = { ...quiz, _id: uuidv4() };
  return model.create(newAssignment);
}

export function deleteQuiz(quizId) {
  return model.deleteOne({ _id: quizId });
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({ _id: quizId }, quizUpdates);
}

export function publishQuiz(quizId) {
  return model.updateOne({ _id: quizId }, { published: "Published" });
}

export function unpublishQuiz(quizId) {
  return model.updateOne({ _id: quizId }, { published: "Unpublished" });
}

export const findQuizzesByPartialName = (partialName) => {
  const regex = new RegExp(partialName, "i");
  return model.find({ title: { $regex: regex } });
};
