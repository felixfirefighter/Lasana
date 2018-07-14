const express = require("express");
const router = express.Router();
const passport = require("passport");

const Task = require("../models/Task");

router.get(
  "/:id/subtasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

router.post(
  "/:id/subtasks",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

router.put(
  "/:id/subtasks/:subtaskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);

router.delete(
  "/:id/subtasks/:subtaskId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {}
);
