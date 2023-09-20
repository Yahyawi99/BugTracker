const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomErrors.BadRequestError("Please enter both values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomErrors.NotFoundError(`No user with email : ${email}`);
  }

  res.send();
};

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  const ExistingUser = await User.findOne({ email });

  if (ExistingUser) {
    throw new CustomErrors.BadRequestError(
      `User with email : ${email} already exists.`
    );
  }

  const user = await User.create({ name, email, password });

  res
    .status(StatusCodes.CREATED)
    .json({ user, msg: "User created succesfully" });
};

module.exports = { login, register };
