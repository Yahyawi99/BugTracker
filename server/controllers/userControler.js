const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");
const CustomError = require("../errors");

// get all users
const allUsers = async (req, res) => {
  const users = await User.find({});

  res.status(StatusCodes.OK).json({ users, count: users.length });
};

// get single user
const singleUser = async (req, res) => {
  const { id: memberId } = req.params;

  const user = await User.findOne({ _id: memberId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${memberId}`);
  }

  res.status(StatusCodes.OK).json({ user });
};

// create user
const createUser = async (req, res) => {
  res.send("create");
};

// update user
const updateUser = async (req, res) => {
  res.send("update");
};

// delete user
const deleteUser = async (req, res) => {
  res.send("delete");
};

module.exports = {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
};
