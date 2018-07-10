const express = require("express");
const auth = require("../routes/auth");
const projects = require("../routes/projects");

module.exports = app => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use("/api/auth", auth);
  app.use("/api/projects", projects);
};
