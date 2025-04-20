import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {

    return model.find({ quiz: quizId });
}

export function createQuestionsForQuiz(quizId, quiz) {
    const newAssignment = { ...quiz, _id: uuidv4(), quiz: quizId };
    return model.create(newAssignment);
}

export function deleteQuizQuestion(quizQuestionId) {
    return model.deleteOne({ _id: quizQuestionId });
}

export function updateQuiz(quizQuestionId, quizQuestionUpdates) {
    return model.updateOne({ _id: quizQuestionId }, quizQuestionUpdates);
}
export async function bulkUpsertQuizQuestions(quizId, questions) {
    // 1) Build the array of operations
    const ops = questions.map(q => {
        // detect “new” client‑side items (e.g. your UI might prefix with "new-")
        const isNewClient = !q.id || String(q.id).startsWith('new-');

        if (isNewClient) {
            // strip out the temporary id, and generate a real _id
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
            // existing — update with upsert in case it doesn’t actually exist
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

    // 2) Run the bulkWrite
    const result = await model.bulkWrite(ops);
    return result;
}

export function bulkDeleteQuizQuestions(ids) {
    return model.deleteMany({ _id: { $in: ids } });
}