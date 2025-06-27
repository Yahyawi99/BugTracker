const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    members: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
