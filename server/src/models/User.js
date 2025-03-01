import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { auto: true, type: mongoose.Schema.Types.ObjectId },
  name: { required: true, type: String },
  points: { default: 0, type: Number },
  profiles: {
    experience: {
      default: 1,
      max: 100,
      min: 1,
      type: Number,
      validate: {
        message: "Experience must be between 1 and 100",
        validator: value => value >= 1 && value <= 100
      }
    },
    goals_assigned: { default: [], type: [String] },
    goals_completed: { default: 0, type: Number },
    items_available: { default: [], type: [String] },
    items_purchased: { default: [], type: [String] },
    level: {
      default: 1,
      min: 1,
      type: Number
    },
    sign_up_selections: {
      commute_distance: {
        enum: ["0-10 km", "10-30 km", "30-50 km", "50+"],
        required() {
          return this.commute_type !== null;
        },
        type: String
      },
      commute_type: {
        enum: ["Car", "Bus", "Walk", "Bike"],
        required: true,
        type: String
      },
      garbage_bags_biweekly: {
        enum: ["0-2", "3-5", "6+"],
        required: true,
        type: String
      },
      recycle_frequency: {
        enum: ["Never", "Sometimes", "Often", "Always"],
        required: true,
        type: String
      }
    },
    streaks: { default: 0, type: Number }
  }
});

const User = mongoose.model("User", userSchema);

export default User;
