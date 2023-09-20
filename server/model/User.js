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
      enum: ["admin", "developer", "PM", "user", "submitter"],
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (this.isModified(this.password)) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

module.exports = mongoose.model("User", UserSchema);
