import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
    },
    name: {
      type: String,
    },
    username: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    googleId: {
      type: String,
    },
    deletedAt: {
      type: Date,
    },

    roles: [{ type: mongoose.Schema.ObjectId, ref: "Role" }],
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

userSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
userSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

const User = mongoose.model("User", userSchema);
export default User;
