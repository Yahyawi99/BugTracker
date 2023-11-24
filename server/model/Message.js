const mongoose = require("mongoose");
const validator = require("validator");

const MessageSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: [true, "Please provide recipient email."],
    },

    subject: {
      type: String,
      trim: true,
      maxlength: 50,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid  recipient email",
      },
      required: [true, "Please provide message subject."],
    },

    message: {
      type: String,
      maxlength: 1000,
      required: [true, "Please provide a message."],
    },

    recipientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
