import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now(),
      expires: 60 * 5,
    },
  },
  { versionKey: false, timestamps: true, _id: true, id: false }
);

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
