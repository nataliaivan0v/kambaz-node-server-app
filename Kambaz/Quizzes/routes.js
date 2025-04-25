import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/quizzes", async (req, res) => {
    const { title } = req.query;
    if (title) {
      const quizzes = await dao.findQuizzesByPartialName(title);
      res.json(quizzes);
      return;
    }

    const quizzes = await dao.findAllQuizzes();
    res.send(quizzes);
  });

  app.get("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    try {
      const quiz = await dao.findQuizById(quizId);
      if (!quiz) {
        res.status(404).json({ error: "Quiz not found" });
        return;
      }
      res.json(quiz);
    } catch (err) {
      console.error("Error fetching quiz:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });  

  app.get("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quizzes = await dao.findQuizzesForCourse(courseId);
    res.json(quizzes);
  });

  app.post("/api/courses/:courseId/quizzes", async (req, res) => {
    const { courseId } = req.params;
    const quiz = {
      ...req.body,
      course: courseId,
    };
    const newQuiz = await dao.createQuiz(quiz);
    res.send(newQuiz);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    const quizUpdates = req.body;
    const updatedQuiz = await dao.updateQuiz(quizId, quizUpdates);
    res.send(updatedQuiz);
  });

  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const { quizId } = req.params;
    await dao.deleteQuiz(quizId);
    res.send({ message: "Assignment deleted successfully" });
  });

  app.put("/api/quizzes/:quizId/publish", async (req, res) => {
    const { quizId } = req.params;
    const result = await dao.publishQuiz(quizId);
    res.send(result);
  });

  app.put("/api/quizzes/:quizId/unpublish", async (req, res) => {
    const { quizId } = req.params;
    const result = await dao.unpublishQuiz(quizId);
    res.send(result);
  });
}
