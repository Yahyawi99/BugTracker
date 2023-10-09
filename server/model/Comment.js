const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      trim: true,
      maxlength: 1000,
      required: [true, "Please provide ticket comment."],
    },

    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
