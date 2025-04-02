const assignment = {
  id: 1,
  title: "NodeJS Assignment",
  description: "Create a NodeJS server with ExpressJS",
  due: "2021-10-10",
  completed: false,
  score: 0,
};
export default function WorkingWithObjects(app) {
  app.get("/lab5/assignment", (req, res) => {
    res.json(assignment);
  });
  app.get("/lab5/assignment/title", (req, res) => {
    res.json(assignment.title);
  });
  app.get("/lab5/assignment/title/:newTitle", (req, res) => {
    const { newTitle } = req.params;
    assignment.title = newTitle;
    res.json(assignment);
  });
  app.put("/lab5/assignment/score", (req, res) => {
    const { score } = req.body;
    if (typeof score === "number") {
      assignment.score = score;
      res.json({ message: "Score updated", assignment });
    } else {
      res.status(400).json({ error: "Invalid score" });
    }
  });

  // Route to update assignment completion status
  app.put("/lab5/assignment/completed", (req, res) => {
    const { completed } = req.body;
    if (typeof completed === "boolean") {
      assignment.completed = completed;
      res.json({ message: "Completion status updated", assignment });
    } else {
      res.status(400).json({ error: "Invalid completed value" });
    }
  });
}
