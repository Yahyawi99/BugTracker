const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Message = require("../model/Message");

const allMessages = async (req, res) => {
  const { id: memberId } = req.params;

  const messages = await Message.find({ recipient: memberId });

  if (!messages) {
    throw new CustomError.NotFoundError(
      `No messages for recipient with id : ${memberId}`
    );
  }

  res.status(StatusCodes.OK).json({ messages });
};

const createMessage = async (req, res) => {
  const { recipientID, email, subject, message } = req.body;

  const newMessage = { recipient: recipientID, email, subject, message };

  await Message.create(newMessage);

  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};

module.exports = { allMessages, createMessage };
