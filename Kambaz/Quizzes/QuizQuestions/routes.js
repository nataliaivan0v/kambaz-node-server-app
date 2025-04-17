import model from "./model.js";

import * as dao from "./dao.js";


export default function QuizQuestionRoutes(app) {
  app.get('/api/quizzes/:quizId/questions', async (req, res) => {
    const { quizId } = req.params;
    try {
      const questions = await dao.findQuestionsForQuiz(quizId);
      console.log(questions)
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
      const newQuestion = await dao.createQuestionsForQuiz(payload);
      return res.status(201).json(newQuestion);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/quizzes/:quizId/questions/:questionId', async (req, res) => {
    const { questionId } = req.params;
    const updates = req.body;
    try {
      const result = await dao.updateQuiz(questionId, updates);
      if (result.modifiedCount === 0) {
        return res.status(404).json({ message: 'Question not found or no change made' });
      }
      return res.json({ message: 'Updated successfully' });
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
}


