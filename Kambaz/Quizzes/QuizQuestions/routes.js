import model from "./model.js";

import * as dao from "./dao.js";


export default function QuizQuestionRoutes(app) {
  app.get('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    try {
      const questions = await dao.findQuestionsForQuiz(quizId);
      return res.json(questions);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    const payload = { ...req.body, course: quizId };
    try {
      const newQuestion = await dao.createQuestionsForQuiz(quizId, payload);
      return res.json(newQuestion);
    } catch (err) {
      console.log("test")
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/quizzes/:quizId/quizquestions/:questionId', async (req, res) => {
    const { quizId, questionId } = req.params;
    const updates = req.body;
    try {
      const result = await dao.updateQuiz(questionId, updates);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Question not found or no change made' });
      }
      return res.json()
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/quizzes/:quizId/questions/:questionId', async (req, res) => {
    const { questionId } = req.params;
    try {
      const result = await dao.deleteQuizQuestion(questionId);
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Question not found' });
      }
      return res.json({ message: 'Deleted successfully' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.post(
    "/api/quizzes/:quizId/quizquestions",
    async (req, res) => {
      const { quizId } = req.params;
      // ← here:
      const { questions, deletedQuestionsIds } = req.body;
  
      console.log("upserting:", questions);
      console.log("deleting:", deletedQuestionsIds);
  
      try {
        if (deletedQuestionsIds.length) {
          await dao.bulkDeleteQuizQuestions(deletedQuestionsIds);
        }
  
        // 2) upsert the rest
        const result = await dao.bulkUpsertQuizQuestions(quizId, questions);
        return res.json({ questions: result });
      } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
      }
    }
  );
  


}


