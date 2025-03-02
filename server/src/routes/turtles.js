import { Router } from "express";

import Turtle from "../models/Turtle.js";
import User from "../models/User.js";

const router = Router();

// Emotional state calculation function
function calculateEmotionalState(currentState, streaks, savedStreaks) {
  // The correct order of emotional states
  const states = ["sad", "neutral", "happy", "excited"];
  const currentIndex = states.indexOf(currentState);

  console.log(
    `Calculating emotional state: current=${currentState}, streaks=${streaks}, savedStreaks=${savedStreaks}`
  );

  // If streaks are maintained or increased (streaks > savedStreaks)
  if (streaks > savedStreaks && streaks > 0) {
    // Improve emotional state by one level
    const newIndex = Math.min(currentIndex + 1, states.length - 1);
    console.log(
      `Streak maintained/increased: Moving from ${states[currentIndex]} to ${states[newIndex]}`
    );
    return states[newIndex];
  }
  // If streaks are not maintained (streaks < savedStreaks or both are 0)

  // Degrade emotional state by one level
  const newIndex = Math.max(currentIndex - 1, 0);
  console.log(
    `Streak not maintained: Moving from ${states[currentIndex]} to ${states[newIndex]}`
  );
  return states[newIndex];
}

// Get Turtle by User ID
router.get("/:userId", async (req, res) => {
  try {
    const turtle = await Turtle.findOne({ userId: req.params.userId });
    if (!turtle) {
      return res.status(404).json({ message: "Turtle not found" });
    }
    return res.json(turtle);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Update Turtle's emotional state for all users
router.post("/update-all-emotional-states", async (req, res) => {
  try {
    console.log("Starting emotional state update for all users");
    const users = await User.find();
    console.log(`Found ${users.length} users to update`);

    const updates = users.map(async user => {
      try {
        const { savedStreaks, streaks } = user.profiles;
        console.log(
          `User ${user._id}: Current streaks=${streaks}, savedStreaks=${savedStreaks}`
        );

        // Update user's saved streaks
        user.profiles.savedStreaks = streaks;

        // Reset streaks if they haven't changed
        if (streaks === savedStreaks) {
          user.profiles.streaks = 0;
          user.profiles.savedStreaks = 0;
        }

        // Save user changes
        await user.save();
        console.log(
          `User ${user._id} updated: streaks=${user.profiles.streaks}, savedStreaks=${user.profiles.savedStreaks}`
        );

        // Find and update the turtle
        const turtle = await Turtle.findOne({ userId: user._id });
        if (turtle) {
          // Calculate new emotional state
          const newEmotionalState = calculateEmotionalState(
            turtle.emotionalState,
            streaks,
            savedStreaks
          );

          console.log(
            `Turtle for user ${user._id}: Changing emotional state from ${turtle.emotionalState} to ${newEmotionalState}`
          );

          // Update the turtle's emotional state
          turtle.emotionalState = newEmotionalState;
          await turtle.save();

          console.log(`Turtle for user ${user._id} updated successfully`);
        } else {
          console.log(`No turtle found for user ${user._id}`);
        }
      } catch (error) {
        console.error(`Error updating user ${user._id}:`, error);
      }
    });

    await Promise.all(updates);
    console.log("All emotional states updated successfully");

    res.json({ message: "All emotional states updated successfully." });
  } catch (err) {
    console.error("Error in update-all-emotional-states:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
