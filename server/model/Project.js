const mongoose = require("mongoose");
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
ProjectSchema.methods.projectTeam = async function (UserModel) {
  const associatedTickets = await Ticket.find({ project: this._id });

  const teamIds = associatedTickets
    .map((ticket) => ticket.assignedTo)
    .reduce((acc, prev) => {
      if (!acc.includes(prev) && prev) {
        acc.push(prev);
      }
      return acc;
    }, []);

  // .map((memberId) => new mongoose.Types.ObjectId(memberId));

  // const updatedTeam = await UserModel.find({ _id: { $in: teamIds } });

  // console.log(updatedTeam.length);

  // teamIds.forEach(async id=>{
  //   const user = await UserModel.find({ _id:id});

  // try {
  //   this.team = [...this.team, ...updatedTeam].reduce((teamArr, user) => {
  //     if (!teamArr.includes(user)) {
  //       teamArr.push(user);
  //     }
  //     return teamArr;
  //   }, []);
  // } catch (error) {
  //   console.log(error);
  // }

  //   if(!!user){
  //     console.log(user)
  //   }
  // });

  // this.team = [...this.team, ...updatedTeam];

  // const testArr = this.team.map((user) => {
  //   return this.team.forEach((member) => {
  //     if (member._id !== user._id) {
  //       return user;
  //     }
  //   });
  // });

  // console.log(testArr);
  // const filteredTeam = [];
  // this.team.forEach((e) => {
  //   if (!filteredTeam.some((user) => user._id === e.id)) {
  //     filteredTeam.push(e);
  //   }
  // });

  // this.team = filteredTeam;
};

module.exports = mongoose.model("Project", ProjectSchema);
