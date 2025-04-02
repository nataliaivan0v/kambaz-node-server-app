let module = {
    id: "M001",
    name: "Web Development",
    description: "Learn to build web applications with MERN",
    course: "CS5610",
  };

export default function Module(app) {
  // Route to get the entire module
  app.get("/lab5/module", (req, res) => {
    res.json(module);
  });

  // Route to get only the module name
  app.get("/lab5/module/name", (req, res) => {
    res.send(module.name);
  });

  // Route to update the module name
  app.put("/lab5/module/name", (req, res) => {
    const { name } = req.body;
    if (name) {
      module.name = name;
      res.json({ message: "Module name updated", module });
    } else {
      res.status(400).json({ error: "Invalid name" });
    }
  });

  // Route to update the module description
  app.put("/lab5/module/description", (req, res) => {
    const { description } = req.body;
    if (description) {
      module.description = description;
      res.json({ message: "Module description updated", module });
    } else {
      res.status(400).json({ error: "Invalid description" });
    }
  });
}
