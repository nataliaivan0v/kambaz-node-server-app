import model from "./model.js";


export function findQuestionsForQuiz(quizId) {
    return model.find({ course: quizId });
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