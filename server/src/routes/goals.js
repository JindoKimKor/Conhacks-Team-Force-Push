import { Router } from "express";
import Goal from "../models/Goal.js";

const router = Router();

// Get all goals
router.get("/", async (req, res) => {
  try {
    const goals = await Goal.find({});
    res.json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific goal by ID
router.get("/:id", async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new goal
router.post("/", async (req, res) => {
  try {
    const goal = new Goal(req.body);
    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a goal
router.put("/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a goal
router.delete("/:id", async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }
    res.json({ message: "Goal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update goal status
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!status || !["completed", "not completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
