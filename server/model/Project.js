const mongoose = require("mongoose");
const Team = require("./Team");

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

    team: {
      type: Array,
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

// create team
// ProjectSchema.methods.projectTeam = async function (UserModel, projectId) {
//   const associatedTickets = await Ticket.find({ project: projectId });

//   const teamIds = associatedTickets
//     .map((ticket) => ticket.assignedTo)
//     .reduce((acc, prev) => {
//       if (!acc.includes(prev)) {
//         acc.push(prev);
//       }
//       return acc;
//     }, [])
//     .map((team) => new mongoose.Types.ObjectId(team));

//   let teamMembers = await UserModel.find({ _id: { $in: teamIds } });

//   teamMembers = [...teamMembers, ...this.team];

//   const uniqueTeamIds = teamMembers
//     .map((member) => member._id)
//     .reduce((arr, id) => {
//       if (!arr.includes(id)) arr.push(id);
//       return arr;
//     }, [])
//     .map((id) => new mongoose.Types.ObjectId(id));

//   teamMembers = await UserModel.find({ _id: { $in: uniqueTeamIds } });

//   this.team = [teamMembers];
// };

ProjectSchema.pre("save", async function () {
  const projectTeam = await Team.findOne({ project: this._id });

  if (!projectTeam) {
    await Team.create({ project: this._id });
    return;
  }

  const managerId = this.managedBy?._id;

  if (managerId) {
    if (!projectTeam.membersIds.includes(managerId)) {
      projectTeam.membersIds.push(managerId);
    }
  }

  await projectTeam.save();
});

ProjectSchema.methods.projectTeam = async function (UserModel) {
  const team = await Team.findOne({ project: this._id });

  const members = await UserModel.find({ _id: { $in: team.membersIds } });

  return members;
};

module.exports = mongoose.model("Project", ProjectSchema);
