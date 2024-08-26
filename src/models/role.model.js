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

    deletedAt: {
      type: Date,
      default: null,
    },

    users: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

    permissions: [{ type: mongoose.Schema.ObjectId, ref: "Permission" }],
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

roleSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
roleSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
