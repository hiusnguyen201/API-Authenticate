import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    emailVerificationAt: {
      type: Date,
      default: null,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const User = mongoose.model("User", userSchema);
export default User;
