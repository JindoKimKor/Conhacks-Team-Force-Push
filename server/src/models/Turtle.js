import mongoose from "mongoose";

const turtleSchema = new mongoose.Schema({
  emotionalState: {
    default: "neutral",
    enum: ["happy", "sad", "neutral", "excited"],
    type: String
  },
  equipment: {
    default: [],
    type: [String]
  },
  userId: {
    ref: "User",
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    unique: true // 1:1 relationship
  }
});

const Turtle = mongoose.model("Turtle", turtleSchema);
export default Turtle;
