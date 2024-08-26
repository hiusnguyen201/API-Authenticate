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

    googleId: {
      type: String,
    },

    deletedAt: {
      type: Date,
      default: null,
    },

    roles: [{ type: mongoose.Schema.ObjectId, ref: "Role" }],
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

userSchema.pre("find", () => {
  this.where({ deletedAt: null });
});
userSchema.pre("findOne", () => {
  this.where({ deletedAt: null });
});

const User = mongoose.model("User", userSchema);
export default User;
