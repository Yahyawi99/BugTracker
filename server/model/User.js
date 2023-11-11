const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Project = require("./Project");
const Ticket = require("./Ticket");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 25,
      required: [true, "Please provide a name"],
    },

    avatar: {
      type: String,
      default: function () {
        const rndmInt = Math.ceil(Math.random() * 5);
        return `/assets/images/default-avatar-${rndmInt}.jpg`;
      },
    },

    email: {
      type: String,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
      required: [true, "Please provide an email"],
    },

    password: {
      type: String,
      minlength: [10, "Password must be at least 10, got '{VALUE}'"],
      required: [true, "Please provide a password"],
    },

    phoneNumber: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["admin", "developer", "PM", "submitter"],
      default: "submitter",
    },

    numOfProjects: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// hash the password after every save
UserSchema.pre("save", async function () {
  // hash the password if modified
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

// compare passwords
UserSchema.methods.ComparePasswords = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

// get user projects
UserSchema.methods.projects = async function (user) {
  if (user.role === "PM") {
    return await Project.find({ managedBy: user._id }).populate("tickets");
    // ************************************
  } else if (user.role === "admin") {
    // ************************************
    const userCreatedProjects = await Project.find({
      createdBy: user.id,
    }).select("id");

    const userCreatedProjectIds = userCreatedProjects.map(
      (project) => project.id
    );

    const userAssignedTickets = await Ticket.find({
      assignedBy: user.id,
    }).populate("project");

    const userAssignedTicketsProjectIds = userAssignedTickets.map((ticket) => {
      console.log(ticket.project.id);
      return ticket.project;
    });

    let userProjectIds = [
      ...userCreatedProjectIds,
      ...userAssignedTicketsProjectIds,
    ];

    userProjectIds = userProjectIds.reduce((arr, id) => {
      if (!arr.includes(id)) {
        arr.push(id);
      }
      return arr;
    }, []);

    return await Project.find({ _id: { $in: userProjectIds } }).populate(
      "tickets"
    );

    // ************************************
  } else {
    const userAssignedTickets = await Ticket.find({
      assignedTo: user.id,
    }).populate("project");

    const userProjectsIds = userAssignedTickets.reduce((arr, ticket) => {
      if (!arr.includes(ticket.project.id)) {
        arr.push(ticket.project.id);
      }
      return arr;
    }, []);

    return await Project.find({ _id: { $in: userProjectsIds } }).populate(
      "tickets"
    );
  }
};

module.exports = mongoose.model("User", UserSchema);
