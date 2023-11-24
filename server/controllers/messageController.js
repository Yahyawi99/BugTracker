const { StatusCodes } = require("http-status-codes");
const Message = require("../model/Message");

const allMessages = async (req, res) => {
  //   const { email } = req.body;
  res.status(StatusCodes.OK).json({});
};

const createMessage = async (req, res) => {
  res.status(StatusCodes.CREATED).json({});
};

module.exports = { allMessages, createMessage };
