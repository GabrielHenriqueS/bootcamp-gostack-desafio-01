const express = require("express");

const server = express();

server.use(express.json());
let requests = 0;
server.use((req, res, next) => {
  requests++;
  next();

  console.log(`Foram realizadas ${requests} requisições`);
});

function checkIdExists(req, res, next) {
  const { id } = req.params;
  let i = "";
  projects.map(function(item, index) {
    item.id === id ? (i = index) : "";
  });
  if (i === "") {
    return res.status(400).json({ error: "Project this not exists" });
  }
  req.project = projects[i];
  req.index = i;

  return next();
}

const projects = [{ id: "1", title: "Novo Projeto", tasks: [] }];
server.get("/projects", (req, res) => {
  return res.json(projects);
});

server.post("/projects", (req, res) => {
  const { id, title, tasks } = req.body;

  projects.push({ id, title, tasks });

  return res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { title } = req.body;

  req.project.title = title;

  return res.json(projects);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  projects.splice(req.index, 1);

  return res.json(projects);
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const { title } = req.body;

  req.project.tasks.push({ title });

  return res.json(projects);
});

server.listen(3000);
