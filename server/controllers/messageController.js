const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const Message = require("../model/Message");

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
  const { recipientID, email, subject, message } = req.body;
  const { userId } = req.user;

  const newMessage = {
    recipient: recipientID,
    sender: userId,
    email,
    subject,
    message,
  };

  // await Message.create(newMessage);
  console.log(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "success!" });
};

module.exports = { allMessages, createMessage };
