import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    value: {
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
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

permissionSchema.pre("find", function () {
  this.where({ deletedAt: null });
});
permissionSchema.pre("findOne", function () {
  this.where({ deletedAt: null });
});

const Permission = mongoose.model("Permission", permissionSchema);
export default Permission;
