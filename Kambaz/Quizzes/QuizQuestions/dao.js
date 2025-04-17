import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {

    return model.find({ quiz: quizId });
}

export function createQuestionsForQuiz(quiz) {
    const newAssignment = { ...quiz, _id: uuidv4() };
    return model.create(newAssignment);
}

export function deleteQuizQuestion(quizQuestionId) {
    return model.deleteOne({ _id: quizQuestionId });
}

export function updateQuiz(quizQuestionId, quizQuestionUpdates) {
    return model.updateOne({ _id: quizQuestionId }, quizQuestionUpdates);
}