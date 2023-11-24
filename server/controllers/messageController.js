const { StatusCodes } = require("http-status-codes");
const Message = require("../model/Message");

const allMessages = async (req, res) => {
  //   const { email } = req.body;
  res.status(StatusCodes.OK).json({});
};

const createMessage = async (req, res) => {
  const { recipientID, email, subject, message } = req.body;

  const newMessage = { recipient: recipientID, email, subject, message };

  await Message.create(newMessage);

  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};

module.exports = { allMessages, createMessage };
