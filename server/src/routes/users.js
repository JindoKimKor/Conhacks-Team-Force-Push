import { Router } from "express";

import Turtle from "../models/Turtle.js";
import User from "../models/User.js";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Create a new user
router.post("/", async (req, res) => {
  try {
    // 1. Create the User
    const newUser = await User.create(req.body);
    console.log(newUser);
    // 2. Create the associated Turtle
    const turtleData = {
      emotionalState: "neutral",
      // Default emotional state
      equipment: [], // Empty equipment array

      userId: newUser._id
    };
    const newTurtle = await Turtle.create(turtleData);

    // 3. Return combined response (optional)
    res.status(200).json({ turtle: newTurtle, user: newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json(updatedUser);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// Delete a user by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;
