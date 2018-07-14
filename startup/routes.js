const express = require("express");
const users = require("../routes/users");
const projects = require("../routes/projects");
const sections = require("../routes/sections");
const tasks = require("../routes/tasks");
const subtasks = require("../routes/subtasks");

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/users", users);
  app.use("/api/projects", projects);
  app.use("/api/sections", sections);
  app.use("/api/tasks", tasks);
  app.use("/api/subtasks", subtasks);
};
