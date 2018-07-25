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
      console.log(err);
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
      console.log(err);
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

//delete project
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await Project.findByIdAndRemove(req.params.id);

      return res.json(req.params.id);
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete project" });
    }
  }
);

// SECTION

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
      return res.status(400).json(err);
    }
  }
);

// TASK

module.exports = router;
