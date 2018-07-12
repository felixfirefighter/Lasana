const express = require("express");
const users = require("../routes/users");
const projects = require("../routes/projects");

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/users", users);
  app.use("/api/projects", projects);
};
