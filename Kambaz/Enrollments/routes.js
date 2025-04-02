import * as enrollmentsDao from "./dao.js";
import * as coursesDao from "../Courses/dao.js"

export default function EnrollmentsRoutes(app) {
  app.post("/api/enrollments", async (req, res) => {
    const { userId, courseId } = req.body;
    const enrollment = await enrollmentsDao.enrollUserInCourse(userId, courseId);
    res.json(enrollment);
  });

  app.delete("/api/enrollments/:userId/:courseId", async (req, res) => {
    const { userId, courseId } = req.params;
    await enrollmentsDao.unenrollUserFromCourse(userId, courseId);
    res.sendStatus(200);
  });

  app.get("/api/enrollments", async (req, res) => {
    const enrollments = await enrollmentsDao.getAllEnrollments();
    res.json(enrollments);
  });

  app.get("/api/enrollments/:userId", async (req, res) => {
    const { userId } = req.params;
    const userEnrollments = await coursesDao.findCoursesForEnrolledUser(userId);
    res.json(userEnrollments);
  });
}