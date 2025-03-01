import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    goal: {
      required: true,
      type: String
    },
    points: {
      default: 0,
      required: true,
      type: Number
    },
    status: {
      default: "not completed",
      enum: ["completed", "not completed"],
      required: true,
      type: String
    },
    xpGain: {
      default: 0,
      required: true,
      type: Number
    }
  },
  {
    timestamps: true
  }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
