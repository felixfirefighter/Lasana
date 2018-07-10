const mongoose = require("mongoose");
const keys = require("../config/keys.js");

module.exports = () => {
  const db = keys.db;
  mongoose
    .connect(
      db,
      { useNewUrlParser: true }
    )
    .then(() => console.log(`Connected to ${db}`));
};
