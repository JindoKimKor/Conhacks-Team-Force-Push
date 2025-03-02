import dotenv from "dotenv";
import mongoose from "mongoose";

import Perk from "../src/models/Perk.js";
import User from "../src/models/User.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";
// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to create users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany({});
    console.log("Cleared existing users");

    // Create a fresh level 1 user
    const newUser = new User({
      email: "newuser@example.com",
      name: "admin",
      password: "password123",
      points: 0,
      profiles: {
        experience: 1,
        goals_assigned: [],
        goals_completed: 0,
        items_available: [],
        items_purchased: [],
        level: 1,
        sign_up_selections: {
          commute_distance: "10-30 km",
          commute_type: "Car",
          garbage_bags_biweekly: "3-5",
          recycle_frequency: "Sometimes"
        },
        streaks: 0
      }
    });

    // Create an experienced level 10 user
    const experiencedUser = new User({
      email: "experienced@example.com",
      name: "Experienced User",
      password: "password123",
      points: 5000,
      profiles: {
        experience: 80,
        goals_assigned: [],
        goals_completed: 45,
        items_available: [],
        items_purchased: [],
        level: 10,
        sign_up_selections: {
          commute_distance: "0-10 km",
          commute_type: "Bike",
          garbage_bags_biweekly: "0-2",
          recycle_frequency: "Always"
        },
        streaks: 15
      }
    });

    // Save users to database
    await newUser.save();
    await experiencedUser.save();

    console.log("Users created successfully:");
    console.log("1. New User (Level 1) - Email: newuser@example.com");
    console.log(
      "2. Experienced User (Level 10) - Email: experienced@example.com"
    );
    console.log("Password for both users: password123");
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedUsers();
