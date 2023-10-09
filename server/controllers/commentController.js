const Comment = require("../model/Comment");
const CustomErrors = require("../errors");
const { StatusCodes } = require("http-status-codes");

// get comments
const getComments = async (req, res) => {
  const { id: ticketId } = req.params;

  const comments = await Comment.find({ ticket: ticketId });

  res.status(StatusCodes.OK).json({ comments });
};

// create comment
const createComments = async (req, res) => {
  const { id: ticketId } = req.params;
  const { userId } = req.user;
  const { value } = req.body;

  if (!value) {
    throw new CustomErrors.BadRequestError("Comment can not be empty.");
  }

  await Comment.create({
    value,
    ticket: ticketId,
    createdBy: userId,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ message: "Comment created successfully." });
};

module.exports = { getComments, createComments };
