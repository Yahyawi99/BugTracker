const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Message = require("../model/Message");
const User = require("../model/User");

const allMessages = async (req, res) => {
  const { id: memberId } = req.params;

  const messages = await Message.find({ recipient: memberId }).populate(
    "sender recipient"
  );

  if (!messages) {
    throw new CustomError.NotFoundError(
      `No messages for recipient with id : ${memberId}`
    );
  }

  res.status(StatusCodes.OK).json({ messages });
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

module.exports = { allMessages, createMessage };
