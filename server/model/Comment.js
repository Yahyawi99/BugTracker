const mongoose = require("mongoose");

const History = require("./History");
const Ticket = require("./Ticket");

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

CommentSchema.pre("save", async function () {
  const ticket = await Ticket.findOne({ _id: this.ticket });

  const historyDocument = {
    title: `New comment added to ticket : ${ticket.title}`,
    description: "The ticket <b>comment</b> was added.",
    actionBy: this.createdBy,
    ticket: ticket._id,
  };

  await History.create(historyDocument);
});

module.exports = mongoose.model("Comment", CommentSchema);
