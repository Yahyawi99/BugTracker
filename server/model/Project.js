const mongoose = require("mongoose");

const Team = require("./Team");
const Ticket = require("./Ticket");

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
      default: null,
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
ProjectSchema.virtual("team", {
  ref: "Team",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

// create team
ProjectSchema.methods.projectTeam = async function (UserModel) {
  //  Manager
  const projectTeam = await Team.findOne({ project: this._id });

  if (!projectTeam) {
    await Team.create({ project: this._id });
    return;
  }
  const membersIds = [];

  const managerId = this.managedBy?._id;

  if (managerId && !membersIds.includes(managerId)) {
    membersIds.push(managerId);
  }

  // Devs
  const associatedTickets = await Ticket.find({ project: this._id });

  associatedTickets
    .map((ticket) => ticket.assignedTo)
    .reduce((acc, id) => {
      if (id && !acc.includes(id)) {
        acc.push(id);
      }
      return acc;
    }, [])
    .forEach((devId) => {
      if (!membersIds.includes(devId)) {
        membersIds.push(devId);
      }
    });

  const members = await UserModel.find({ _id: { $in: membersIds } });

  projectTeam.members = members;
  await projectTeam.save();
};

module.exports = mongoose.model("Project", ProjectSchema);
