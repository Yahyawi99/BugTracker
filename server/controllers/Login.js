const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const id = v4();

  const token = jwt.sign({ id, email }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(StatusCodes.OK).json({ msg: "Token created successfully", token });
};

module.exports = { login };
