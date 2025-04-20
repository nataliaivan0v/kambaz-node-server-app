import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {

    return model.find({ quiz: quizId });
}

export async function createQuestionsForQuiz(quizId, quiz) {
    const newAssignment = { ...quiz, _id: uuidv4(), quiz: quizId };
    await model.create(newAssignment);
    return findQuestionsForQuiz(quizId)
}

export function deleteQuizQuestion(quizQuestionId) {
    return model.deleteOne({ _id: quizQuestionId });
}

export function updateQuiz(quizQuestionId, quizQuestionUpdates) {
    return model.updateOne({ _id: quizQuestionId }, quizQuestionUpdates);
}
export async function bulkUpsertQuizQuestions(quizId, questions) {
    const ops = questions.map(q => {
        const isNewClient = !q.id || String(q.id).startsWith('new-');

        if (isNewClient) {
            const { id: _temp, ...rest } = q;
            return {
                insertOne: {
                    document: {
                        _id: uuidv4(),
                        quiz: quizId,
                        ...rest
                    }
                }
            };
        } else {
            return {
                updateOne: {
                    filter: { _id: q.id },
                    update: {
                        $set: {
                            quiz: quizId,
                            title: q.title,
                            type: q.type,
                            points: q.points,
                            text: q.text,
                            choices: q.choices,
                            correct_answer_index: q.correct_answer_index,
                        }
                    },
                    upsert: true
                }
            };
        }
    });

    await model.bulkWrite(ops);
    const result = findQuestionsForQuiz(quizId) 

    return result;
}

export function bulkDeleteQuizQuestions(ids) {
    return model.deleteMany({ _id: { $in: ids } });
}