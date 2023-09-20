const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomEroors = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomEroors.BadRequestError("Please enter both values");
  }

  res.send();
};

module.exports = { login };
