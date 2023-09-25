const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

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

    role: {
      type: String,
      enum: ["admin", "developer", "PM", "submitter"],
      default: "submitter",
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

UserSchema.methods.assignTo = async function (ticketId) {
  UserSchema.add({});
  this.assignedTo = ticketId;
};

module.exports = mongoose.model("User", UserSchema);
