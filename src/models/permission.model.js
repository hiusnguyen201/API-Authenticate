import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: true,
      enum: ["create", "read", "update", "delete"],
    },
    module: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
