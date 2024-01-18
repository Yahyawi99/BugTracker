const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Message = require("../model/Message");
const User = require("../model/User");

const allMessages = async (req, res) => {
  const { id: memberId } = req.params;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const messages = await Message.find({ recipient: memberId })
    .populate("sender recipient")
    .skip(skip)
    .limit(limit);

  if (!messages) {
    throw new CustomError.NotFoundError(
      `No messages for recipient with id : ${memberId}`
    );
  }

  const totalMessages = await Message.countDocuments({ recipient: memberId });
  const numOfPages = Math.ceil(totalMessages / limit);
  const count = messages.length;

  res
    .status(StatusCodes.OK)
    .json({ messages, numOfPages, count, currentPage: page });
};

// create message
const createMessage = async (req, res) => {
  const {
    recipient: recipientEmail,
    subject,
    message,
  } = JSON.parse(req.body.data);
  const { userId } = req.user;

  const recipientDocument = await User.findOne({ email: recipientEmail });

  const newMessage = {
    recipient: recipientDocument._id,
    sender: userId,
    subject,
    message,
  };

  await Message.create(newMessage);

  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};

const editMessage = async (req, res) => {
  const { isRead } = req.body;
  const { messageId } = req.params;

  const message = await Message.findOne({ _id: messageId });

  if (!message) {
    throw new CustomError.NotFoundError(`No message with id : ${messageId}`);
  }

  message.isRead = isRead;

  await message.save();

  res.status(StatusCodes.OK).json({ msg: "success" });
};

module.exports = { allMessages, createMessage, editMessage };
