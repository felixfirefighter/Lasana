const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const task = await Task.findOneAndUpdate(
        { "subtasks._id": id },
        {
          $set: { "subtasks.$.name": name }
        },
        { new: true }
      );

      return res.json(task);
    } catch (err) {
      return res.status(400).json({ error: "Unable to update subtask" });
    }
  }
);

router.put(
  "/:id/updateStatus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findOne({ "subtasks._id": id });

      const subtask = task.subtasks.find(t => t.id === id);
      subtask.isCompleted = !subtask.isCompleted;
      await task.save();

      return res.json(task);
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "Unable to update subtask" });
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      const task = await Task.findOneAndUpdate(
        { "subtasks._id": id },
        { $pull: { subtasks: { _id: id } } },
        { new: true }
      );

      return res.json(task);
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete subtask" });
    }
  }
);

module.exports = router;
