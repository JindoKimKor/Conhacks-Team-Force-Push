import { Router } from "express";

import Goal from "../models/Goal.js";
import User from "../models/User.js";
import { generatePersonalizedGoals } from "../services/cohereService.js";

const router = Router();

// Generate personalized goals for a user
router.post("/", async (req, res) => {
  try {
    const { count = 5 } = req.body;
    const user = await User.findById(req.query.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user has completed profile
    if (!user.profiles || !user.profiles.sign_up_selections) {
      return res.status(400).json({
        message:
          "User profile is incomplete. Please complete the sign-up selections."
      });
    }

    // Generate goals using Cohere
    const generatedGoals = await generatePersonalizedGoals(user, count);

    // Save generated goals to database
    const savedGoals = await Promise.all(
      generatedGoals.map(async goalData => {
        // Add points and XP with hardcoded values
        const goal = new Goal({
          ...goalData,
          points: 50, // Hardcoded points value
          xpGain: 100 // Hardcoded XP value
        });
        await goal.save();
        return goal;
      })
    );

    // Update user's assigned goals
    user.profiles.goals_assigned = [
      ...user.profiles.goals_assigned,
      ...savedGoals.map(goal => goal._id)
    ];
    await user.save();

    return res.status(200).json(savedGoals);
  } catch (error) {
    console.error("Error generating goals:", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
