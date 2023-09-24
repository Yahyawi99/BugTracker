const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const TicketSchema = new Schema(
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
      enum: ["high", "low", "urgent"],
      required: [true, "Please provide ticket priority"],
    },

    status: {
      type: String,
      enum: ["new", "resolved", "development"],
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
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.Mixed,
      ref: "User",
      validate: {
        validator: function (value) {
          return value === "" || ObjectId.isValid(value);
        },
        message: "assignedTo must be an ObjectId or an empty string.",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ticket", TicketSchema);
