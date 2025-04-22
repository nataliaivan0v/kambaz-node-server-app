import * as dao from "./dao.js";

export default function QuizResultsRoutes(app) {
  app.get("/api/quizresults/:quizId/users/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    try {
      const result = await dao.findQuizResults(quizId, userId);
      if (!result) return res.status(404).json({ message: "Not found" });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });


  app.put("/api/quizresults/:quizId/users/:userId", async (req, res) => {
    const { quizId, userId } = req.params;
    const resultData = req.body;
    console.log(quizId)
    console.log(userId)
    try {
      const { modifiedCount } = await dao.updateQuizResults(quizId, userId, resultData);
      if (modifiedCount === 0) {
        return res.status(404).json({ message: "No matching quiz result to update" });
      }
      res.json({ message: "Updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  });
}
