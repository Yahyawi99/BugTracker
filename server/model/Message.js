const mongoose = require("mongoose");
const validator = require("validator");

const MessageSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subject: {
      type: String,
      trim: true,
      maxlength: 50,
      required: [true, "Please provide message subject."],
    },

    message: {
      type: String,
      maxlength: 1000,
      required: [true, "Please provide a message."],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
