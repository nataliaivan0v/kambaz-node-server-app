import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
  app.get("/api/assignments", async (req, res) => {
    const assignments = await dao.findAllAssignments();
    res.send(assignments);
  });

  app.get("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignments = await dao.findAssignmentsForCourse(courseId);
    res.json(assignments);
  });

  app.post("/api/courses/:courseId/assignments", async (req, res) => {
    const { courseId } = req.params;
    const assignment = {
      ...req.body,
      course: courseId,
    };
    const newAssignment = await dao.createAssignment(assignment);
    res.send(newAssignment);
  });

  app.put("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    const updatedAssignment = await dao.updateAssignment(
      assignmentId,
      assignmentUpdates
    );
    res.send(updatedAssignment);
  });

  app.delete("/api/assignments/:assignmentId", async (req, res) => {
    const { assignmentId } = req.params;
    await dao.deleteAssignment(assignmentId);
    res.send({ message: "Assignment deleted successfully" });
  });
}
