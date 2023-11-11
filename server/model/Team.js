const mongoose = require("mongoose");

const ProjectTeam = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    membersIds: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", ProjectTeam);
