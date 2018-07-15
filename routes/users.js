const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const User = require("../models/User");
const keys = require("../config/keys");
const validateRegister = require("../validation/register");
const validateLogin = require("../validation/login");

router.post("/register", async (req, res) => {
  const { errors, isValid } = validateRegister(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user)
      return res.status(400).json({ email: "Email already registered" });

    const newUser = new User({ email, password });

    const salt = await bcrypt.genSalt(10);

    newUser.password = await bcrypt.hash(newUser.password, salt);

    await newUser.save();

    return res.json({ newUser });
  } catch (err) {
    return res.status(400).json({ error: "Unable to register user" });
  }
});

router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ email: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ password: "Password incorrect" });

    const { id } = user;
    const payload = { id };

    const token = await jwt.sign(payload, keys.secretOrKey);

    return res.json({ token: `Bearer ${token}` });
  } catch (err) {
    return res.status(400).json({ error: "Unable to login" });
  }
});

module.exports = router;
