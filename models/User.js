const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 255,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 1024
  }
});

module.exports = User = mongoose.model("User", UserSchema);
