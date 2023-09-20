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

  if (!name || !email || !password) {
    throw new CustomErrors.BadRequestError("Please enter all values");
  }

  const user = await User.create(
    { ...req.body },
    { new: true, runValidators: true }
  );

  res
    .status(StatusCodes.CREATED)
    .json({ user, msg: "User created succesfully" });
};

module.exports = { login, register };
