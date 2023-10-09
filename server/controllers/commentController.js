const Comment = require("../model/Comment");
const CustomErrors = require("../errors");

// get comments
const getComments = async (req, res) => {
  res.send("get");
};

// create comment
const createComments = async (req, res) => {
  res.send("create");
};

module.exports = { getComments, createComments };
