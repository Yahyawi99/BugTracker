const { StatusCodes } = require("http-status-codes");

const dashboard = async (req, res) => {
  res.send("home");
};

module.exports = { dashboard };
