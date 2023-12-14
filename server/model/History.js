const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please provide history title."],
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      required: [true, "Please provide history description."],
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    actionBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
