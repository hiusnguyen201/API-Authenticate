import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
    emailVerificationAt: {
      type: Date,
    },
    googleId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const User = mongoose.model("User", userSchema);
export default User;
