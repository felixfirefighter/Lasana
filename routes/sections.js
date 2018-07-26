const express = require("express");
const router = express.Router();
const passport = require("passport");

const Project = require("../models/Project");
const validateProject = require("../validation/project");

//update section
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const project = await Project.findOneAndUpdate(
        {
          user: req.user.id,
          "sections._id": id
        },
        {
          $set: {
            "sections.$.name": name === "" ? "Untitled Column" : name
          }
        },
        { new: true }
      ).populate("sections.tasks");

      return res.json(project);
    } catch (err) {
      return res.status(400).json({ error: "Unable to update section" });
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
        {
          user: req.user.id,
          "sections._id": id
        },
        {
          $pull: { sections: { _id: id } }
        }
      );
      return res.json(id);
    } catch (err) {
      return res.status(400).json({ error: "Unable to delete section" });
    }
  }
);

// ADD TASK

router.post(
  "/:id/tasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { id } = req.params;
    const { name, description, dueDate } = req.body;
    try {
      const task = new Task({ name, description, dueDate });
      await task.save();

      await Project.findOneAndUpdate(
        {
          user: req.user.id,
          "sections._id": id
        },
        {
          $push: {
            "sections.$.tasks": { $each: [task._id], $position: 0 }
          }
        },
        { new: true }
      );

      return res.json({ sectionId: id, task });
    } catch (err) {
      return res.status(400).json({ error: "Unable to create new task" });
    }
  }
);

module.exports = router;
