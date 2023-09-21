const User = require("../model/User");
const { StatusCodes } = require("http-status-codes");
const CustomErrors = require("../errors");
const { createTokenUser, attachCookieToResponse } = require("../utils");

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new CustomErrors.BadRequestError("Please enter both values");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new CustomErrors.NotFoundError(`User not found`);
  }

  //   compare password
  const isPasswordCorrect = await user.ComparePasswords(password);

  if (!isPasswordCorrect) {
    throw new CustomErrors.UnauthorizedEror("Invalid Password!");
  }

  // create token-user and attach cookie to response
  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });

  res.status(StatusCodes.OK).json({ user, msg: `Welcome back ${user.name}` });
};

// Register
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomErrors.BadRequestError("Please enter all values");
  }

  const ExistingUser = await User.findOne({ email });

  if (ExistingUser) {
    throw new CustomErrors.BadRequestError(
      `User with email : ${email} already exists.`
    );
  }

  const user = await User.create({ name, email, password });

  // create token-user and attach cookie to response
  const tokenUser = createTokenUser(user);
  attachCookieToResponse({ res, user: tokenUser });

  res
    .status(StatusCodes.CREATED)
    .json({ tokenUser, msg: "User created succesfully" });
};

// Logout
const logout = async (req, res) => {
  res.cookie("access_token", "logged_out", { expires: new Date(Date.now()) });

  res.status(StatusCodes.OK).json({ msg: "User logged out successfully!" });
};

module.exports = { login, register, logout };
