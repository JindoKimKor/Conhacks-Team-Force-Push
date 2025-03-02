import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String,
    unique: true,
    validate: {
      message: "Invalid email format",
      validator: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(value)
    }
  },
  name: { required: true, type: String },
  password: {
    minlength: 8,
    required: true,
    type: String
    //select: false
  },
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
    items: {
      type: [
        {
          item_id: { type: String, required: true },
          availability: { type: Boolean, default: true }
        }
      ],
      default: []
    },
    level: {
      default: 1,
      min: 1,
      type: Number
    },
    savedStreaks: { default: 0, type: Number },
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
