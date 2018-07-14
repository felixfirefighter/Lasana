const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

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

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;

    try {
      await Project.findOneAndUpdate(
        { "sections.$.tasks._id": id },
        { $pull: { "sections.$.tasks._id": id } }
      );

      await Task.findOneAndRemove({
        _id: taskId
      });

      return res.json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete task" });
    }
  }
);

module.exports = router;
