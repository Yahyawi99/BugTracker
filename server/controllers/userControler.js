const { StatusCodes } = require("http-status-codes");
const cloudinary = require("cloudinary").v2;
const User = require("../model/User");
const CustomError = require("../errors");

// get all users
const allUsers = async (req, res) => {
  const { sort, search } = req.query;

  // pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  let users = User.find({}).skip(skip).limit(limit);

  // **************
  // sort
  if (sort) {
    if (sort === "Name") {
      users = users.sort("-name");
    }

    if (sort === "-Name") {
      users = users.sort("name");
    }

    if (sort === "Current Role") {
      users = users.sort("-role");
    }

    if (sort === "-Current Role") {
      users = users.sort("role");
    }
  }

  // **************
  // search
  if (search) {
    users = users.find({ name: { $regex: search, $options: "i" } });
  }

  users = await users;

  users.forEach(async (user) => {
    const projects = await user.projects(user);
    user.numOfProjects = projects.length;
    await user.save();
  });

  // *************
  const totalUsers = await User.countDocuments({
    name: { $regex: search, $options: "i" },
  });
  const numOfPages = Math.ceil(totalUsers / limit);
  const count = users.length;

  res
    .status(StatusCodes.OK)
    .json({ users, numOfPages, currentPage: page, count, totalUsers });
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
  const {
    name,
    phoneNumber,
    newEmail,
    currentPassword,
    newPassword,
    newPasswordConfirmed,
    newRole,
  } = JSON.parse(req.body.data);

  const user = await User.findOne({ _id: userId });

  if (!user) {
    throw new CustomError.NotFoundError(`No user with id : ${userId}`);
  }

  // profile
  if (name) {
    user.name = name;
  }
  if (phoneNumber) {
    user.phoneNumber = phoneNumber;
  }

  if (req.files) {
    const { file } = req.files;

    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: "Bugtracker",
    });

    user.avatar = result.secure_url;
  }

  // email
  if (newEmail) {
    user.email = newEmail;
  }

  // password
  if (currentPassword && newPassword && newPasswordConfirmed) {
    const isSameOldPassword = await user.ComparePasswords(currentPassword);

    if (!isSameOldPassword) {
      throw new CustomError.BadRequestError("Curent password is incorrect!");
    }

    if (newPassword !== newPasswordConfirmed) {
      throw new CustomError.BadRequestError(
        "Please provide the same value for new password"
      );
    }

    user.password = newPassword;
  }

  // role
  if (newRole) {
    if (newRole === "None selected") {
      user.role = "";
    } else {
      user.role = newRole;
    }
  }

  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Updated Succesfully" });
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
