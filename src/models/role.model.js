import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    hidden: {
      type: Boolean,
      default: false,
    },
    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Role = mongoose.model("Role", roleSchema);
export default Role;
