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

    team: {
      type: Array,
      default: [],
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
ProjectSchema.methods.projectTeam = async function () {
  const associatedTickets = await Ticket.find({ project: this._id });

  const teamIds = associatedTickets
    .map((ticket) => ticket.assignedTo)
    .reduce((acc, prev) => {
      if (!acc.includes(prev)) {
        acc.push(prev);
      }
      return acc;
    }, [])
    .map((team) => new mongoose.Types.ObjectId(team));

  this.team = await User.find({ _id: { $in: teamIds } });
};

module.exports = mongoose.model("Project", ProjectSchema);
