const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  sections: [
    {
      name: {
        type: String,
        required: true
      },
      tasks: [
        {
          type: Schema.Types.ObjectId,
          ref: "Task"
        }
      ]
    }
  ]
});

module.exports = Project = mongoose.model("Project", ProjectSchema);
