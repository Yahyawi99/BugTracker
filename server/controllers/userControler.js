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

  res.status(StatusCodes.OK).json(user);
};

// create user
const userProjects = async (req, res) => {
  const { id: userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }

  const projects = await user.projects(user);

  res.status(StatusCodes.OK).json(projects);
};

// current user
const currentUser = async (req, res) => {
  const { userId } = req.user;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }

  res.status(StatusCodes.OK).json(user);
};

// update user
const updateUser = async (req, res) => {
  const { id: userId } = req.params;
  const { name, phoneNumber, email, password } = req.body;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }

  user.name = name;
  user.phoneNumber = phoneNumber;

  // if (user.email) {
  console.log(email);
  // }

  await user.save();

  res.send("update");
};

// delete user
const deleteUser = async (req, res) => {
  res.send("delete");
};

module.exports = {
  allUsers,
  singleUser,
  userProjects,
  updateUser,
  deleteUser,
  currentUser,
};
