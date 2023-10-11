const mongoose = require("mongoose");
const History = require("./History");

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

    isArchived: {
      type: Boolean,
      default: false,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.Mixed,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

TicketSchema.pre("save", async function () {
  if (this.isNew) {
    const historyDocument = {
      title: `New Ticket Created`,
      description: "A new ticket was added.",
      actionBy: this.assignedBy,
      ticket: this._id,
      createdAt: this.createdAt,
    };

    await History.create(historyDocument);
  }
});

module.exports = mongoose.model("Ticket", TicketSchema);
