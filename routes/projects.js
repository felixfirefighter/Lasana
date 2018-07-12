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
      });

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

router.post(
  "/:id/sections",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { errors, isValid } = validateProject(req.body);
    if (!isValid) return res.status(400).json(errors);

    const { name } = req.body;

    try {
      const project = await Project.findOne({
        user: req.user.id,
        _id: req.params.id
      });

      if (project == null)
        return res.status(404).json({ noProjectFound: "No project found" });

      const section = { name };

      project.sections.push(section);

      await project.save();

      return res.json(project);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

//update section
router.post(
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

router.post(
  "/:id/sections/:sectionId/task/:taskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id, sectionId, taskId } = req.params;
    const { name, description, dueDate } = req.body;
    try {
      // get project with id and user id
      const project = await Project.findOne({ _id: id, user: req.user.id });
      if (project == null)
        return res.status(404).json({ noProjectFound: "No project found" });

      const section = project.sections.find(s => s._id === sectionId);
      if (section == null)
        return res.status(404).json({ noSectionFound: "No section found" });

      const task = new Task({ name, description, dueDate });
      await task.save();

      return res.json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

module.exports = router;
