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
      required: [true, "Please provide an email"],
      validate: {
        validator: validator.isEmail,
        message: "Please provide a valid email",
      },
    },

    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 10,
    },

    role: {
      type: String,
      enum: ["admin", "developer", "PM", "user", "submitter"],
      required: true,
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
