const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: [true, "Please provide project name"],
    },

    company: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please provide project company"],
    },

    description: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 1000,
      required: [true, "Please provide project description"],
    },

    status: {
      type: String,
      enum: ["planning", "in progress", "completed", "on hold", "canceled"],
      default: "in progress",
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium",
    },

    progress: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      trim: true,
      required: [true, "Please provide project category"],
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },

    startDate: {
      type: Date,
      required: [true, "Please provide project start date"],
    },

    endDate: {
      type: Date,
      required: [true, "Please provide project end date"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
