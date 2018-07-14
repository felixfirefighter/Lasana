const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

router.put(
  "/:id/updateStatus",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

router.delete(
  "/subtasks/:subtaskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

module.exports = router;
