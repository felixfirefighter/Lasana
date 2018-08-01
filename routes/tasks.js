const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);

      return res.json(task);
    } catch (err) {
      return res.json(err);
    }
  }
);

// update
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, dueDate } = req.body;
    try {
      const updateObj = {};
      if (name) updateObj.name = name;
      if (description) updateObj.description = description;
      if (dueDate) updateObj.dueDate = dueDate;

      const task = await Task.findByIdAndUpdate(
        id,
        { $set: updateObj },
        { new: true }
      );

      return res.json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.put(
  "/:id/updateStatus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findById(id);
      task.isCompleted = !task.isCompleted;
      await task.save();

      return res.json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      await Project.findOneAndUpdate(
        { "sections.tasks._id": id },
        { $pull: { "sections.$.tasks._id": id } }
      );

      await Task.findOneAndRemove({
        _id: id
      });

      return res.json(id);
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete task" });
    }
  }
);

router.post(
  "/:id/subtasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const task = await Task.findByIdAndUpdate(
        id,
        { $push: { subtasks: { name } } },
        { new: true }
      );

      return res.json(task);
    } catch (err) {
      return res.status(400).json({ err: "Unable to add subtask" });
    }
  }
);

module.exports = router;
