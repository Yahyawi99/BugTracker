const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 5,
      maxlength: 100,
      required: [true, "Please provide ticket title"],
    },

    description: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 1000,
      required: [true, "Please provide ticket description"],
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low", "urgent"],
      required: [true, "Please provide ticket priority"],
    },

    status: {
      type: String,
      enum: ["new", "resolved", "testing", "development"],
      default: "new",
    },

    type: {
      type: String,
      enum: [
        "enhancement",
        "changeRequest",
        "defect",
        "workTask",
        "newDevelopment",
        "generalTask",
      ],
      required: true,
    },

    isAssigned: {
      type: Boolean,
      default: false,
    },

    project: {
      type: mongoose.Types.ObjectId,
      ref: "project",
      required: true,
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
