import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuizResults(quizId, userId) {
  return model.findOneAndUpdate(
    { quiz: quizId, user: userId },
    {
      $setOnInsert: {
        attempts:   0,
        lastAnswers: [],
        lastScore:  0
      }
    },
    {
      new:    true,   
      upsert: true    
    }
  ).lean().exec();
}




export async function updateQuizResults(quizId, userId, resultData) {
  return model.updateOne(
    { quiz: quizId, user: userId },
    {
      $inc: { attempts: 1 },
      $set: {
        lastAnswers: resultData.lastAnswers,
        lastScore:   resultData.lastScore,
      },
    }
  );
}
