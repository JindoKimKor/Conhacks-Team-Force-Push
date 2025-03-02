import { Router } from "express";

import Turtle from "../models/Turtle.js";
import User from "../models/User.js";

const router = Router();

// Emotional state calculation function
function calculateEmotionalState(currentState, streaks, savedStreaks) {
  const states = ["sad", "neutral", "happy", "excited"];
  const currentIndex = states.indexOf(currentState);

  if (streaks === savedStreaks) {
    // Degrade emotional state
    return currentIndex > 0 ? states[currentIndex - 1] : "sad";
  } else if (streaks > savedStreaks) {
    // Improve emotional state
    return currentIndex < states.length - 1
      ? states[currentIndex + 1]
      : "excited";
  }

  // Default case (shouldn't happen)
  return currentState;
}

// Get Turtle by User ID
router.get("/:userId", async (req, res) => {
  try {
    const turtle = await Turtle.findOne({ userId: req.params.userId });
    if (!turtle) return res.status(404).json({ message: "Turtle not found" });
    res.json(turtle);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Turtle's emotional state for all users
router.post("/update-all-emotional-states", async (req, res) => {
  try {
    const users = await User.find();

    await Promise.all(
      users.map(async user => {
        const { savedStreaks, streaks } = user.profiles;
        user.profiles.savedStreaks = streaks;
        if (streaks === savedStreaks) {
          user.profiles.streaks = 0;
        }

        const turtle = await Turtle.findOne({ userId: user._id });
        await Promise.all([
          user.save(),
          turtle &&
            turtle.save({
              emotionalState: calculateEmotionalState(
                turtle.emotionalState,
                streaks,
                savedStreaks
              )
            })
        ]);
      })
    );

    res.json({ message: "All emotional states updated successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
