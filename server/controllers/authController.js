const { StatusCodes } = require("http-status-codes");

const login = async (req, res) => {
  res.send("login");
};

module.exports = { login };
