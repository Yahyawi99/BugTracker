const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const ProjectSchema = new Schema(
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
      enum: ["active", "inactive"],
      default: "inactive",
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low", "urgent"],
      required: [true, "Please provide project priority"],
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

    startDate: {
      type: Date,
      required: [true, "Please provide project start date"],
    },

    endDate: {
      type: Date,
      required: [true, "Please provide project end date"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },

    managedBy: {
      type: mongoose.Schema.Types.Mixed,
      ref: "user",
      validate: {
        validator: function (value) {
          return value === "" || ObjectId.isValid(value);
        },
        message: "managedBy must be an ObjectId or an empty string.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
