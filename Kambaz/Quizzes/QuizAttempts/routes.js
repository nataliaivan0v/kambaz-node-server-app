import * as dao from "./dao.js";

export default function QuizAttemptRoutes(app) {
    app.post("/api/quizzes/:quizId/attempts", async (req, res) => {
        console.log("📝 Saving attempt for quiz:", req.params.quizId);
        console.log("Payload:", req.body);
    const { quizId } = req.params;
    const { studentId, answers, score, timeTaken, total, courseId } = req.body;
    const attempt = await dao.createAttempt({
      quizId,
      courseId,
      studentId,
      answers,
      score,
      total,
      timeTaken,
    });
    res.json(attempt);
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId", async (req, res) => {
    const { quizId, studentId } = req.params;
    console.log("📥 GET attempts for", quizId, studentId);
  
    const attempts = await dao.findAttemptsByStudentAndQuiz(studentId, quizId);
    console.log("📤 Returning attempts:", attempts);
    res.json(attempts);
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId/latest", async (req, res) => {
    const { quizId, studentId } = req.params;
    const latest = await dao.findLastAttempt(studentId, quizId);
    res.json(latest);
  });

  app.get("/api/quizzes/:quizId/attempts/:studentId/count", async (req, res) => {
    const { quizId, studentId } = req.params;
    const count = await dao.countAttempts(studentId, quizId);
    res.json({ count });
  });
}
