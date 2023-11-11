const mongoose = require("mongoose");

const ProjectTeamSchema = new mongoose.Schema({
  project: {
    type: mongoose.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  members: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Team", ProjectTeamSchema);
