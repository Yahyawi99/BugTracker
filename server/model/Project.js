const mongoose = require("mongoose");
const Ticket = require("./Ticket");
const User = require("./User");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 100,
      required: [true, "Please provide project name"],
    },

    company: {
      type: String,
      trim: true,
      maxlength: 100,
      required: [true, "Please provide project company"],
    },

    description: {
      type: String,
      trim: true,
      minlength: 10,
      maxlength: 1000,
      required: [true, "Please provide project description"],
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },

    priority: {
      type: String,
      enum: ["high", "medium", "low", "urgent"],
      required: [true, "Please provide project priority"],
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    startDate: {
      type: Date,
      required: [true, "Please provide project start date"],
    },

    endDate: {
      type: Date,
      required: [true, "Please provide project end date"],
    },

    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    managedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtuels
ProjectSchema.virtual("tickets", {
  ref: "Ticket",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

// const Model =

ProjectSchema.methods.projectTeam = async function () {
  const associatedTickets = await Ticket.find({ project: this._id });

  const teamArray = associatedTickets
    .map((ticket) => ticket.assignedTo)
    .reduce((acc, prev) => {
      if (!acc.includes(prev)) {
        acc.push(prev);
      }
      return acc;
    }, [])
    .map((team) => new mongoose.Types.ObjectId(team));

  // const teamFormatted = teamArray.forEach(async (userId) => {
  //   const user = await User.find({ _id: new mongoose.Types.ObjectId(userId) });
  //   console.log(user);
  //   return user;
  // });

  // const users = await User.find({ _id: { $in: teamArray } });

  console.log(teamArray);

  console.log("=========================");
};

module.exports = mongoose.model("Project", ProjectSchema);
