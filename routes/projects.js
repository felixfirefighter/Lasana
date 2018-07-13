const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../models/Project");
const Task = require("../models/Task");
const validateProject = require("../validation/project");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });

      return res.json(projects);
    } catch (err) {
      return res.status(404).json({ noProjectFound: "No project is found" });
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const project = await Project.findOne({
        user: req.user.id,
        _id: req.params.id
      }).populate("sections.tasks");

      return res.json(project);
    } catch (err) {
      return res.status(404).json({ noProjectFound: "No project is found" });
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { name, description } = req.body;

    try {
      const project = new Project({
        name,
        description,
        user: req.user.id
      });

      await project.save();

      return res.json(project);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

// update project
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { name, description } = req.body;

    try {
      const project = await Project.findByIdAndUpdate(
        req.params.id,
        {
          $set: { name, description }
        },
        { new: true }
      );

      return res.json(project);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.post(
  "/:id/sections",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { name } = req.body;

    try {
      const project = await Project.findOneAndUpdate(
        {
          user: req.user.id,
          _id: req.params.id
        },
        { $push: { sections: { name } } },
        { new: true }
      );

      return res.json(project);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//update section
router.put(
  "/:id/sections/:sectionId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { id, sectionId } = req.params;
    const { name } = req.body;

    try {
      const project = await Project.findOneAndUpdate(
        {
          user: req.user.id,
          _id: id,
          "sections._id": sectionId
        },
        {
          $set: {
            "sections.$.name": name
          }
        },
        { new: true }
      );

      return res.json(project);
    } catch (err) {
      console.log(err);
      return res.status(500).json();
    }
  }
);

//create new task
router.post(
  "/:id/sections/:sectionId/tasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, sectionId } = req.params;
    const { name, description, dueDate } = req.body;
    try {
      const task = new Task({ name, description, dueDate });
      await task.save();

      const project = await Project.findOneAndUpdate(
        {
          _id: id,
          user: req.user.id,
          "sections._id": sectionId
        },
        { $push: { "sections.$.tasks": { _id: task._id } } },
        { new: true }
      );

      return res.json({ project, task });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  }
);

// update
router.put(
  "/:id/sections/:sectionId/tasks/:taskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, sectionId, taskId } = req.params;
    const { name, description, dueDate } = req.body;
    try {
      // get project with id and user id
      const project = await Project.findByIdAndUpdate({
        _id: id,
        user: req.user.id
      });
      if (project == null)
        return res.status(404).json({ noProjectFound: "No project is found" });

      const updateObj = {};
      if (name) updateObj.name = name;
      if (description) updateObj.description = description;
      if (dueDate) updateObj.dueDate = dueDate;

      const task = await Task.findByIdAndUpdate(
        taskId,
        { $set: updateObj },
        { new: true }
      );

      return res.json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
