const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  dueDate: {
    type: Date
  },
  subtasks: [
    {
      name: {
        type: String
      },
      isCompleted: {
        type: Boolean,
        default: false
      }
    }
  ],
  isCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = Task = mongoose.model("Task", TaskSchema);
