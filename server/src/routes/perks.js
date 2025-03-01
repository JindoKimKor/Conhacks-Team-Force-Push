import { Router } from "express";

import Perk from "../models/Perk.js";

const router = Router();

// Get all perks (with optional level filter)
router.get("/", async (req, res) => {
  try {
    const { level } = req.query;
    const query = level ? { level } : {};
    const perks = await Perk.find(query);
    res.json(perks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific perk by ID
router.get("/:id", async (req, res) => {
  try {
    const perk = await Perk.findById(req.params.id);
    if (!perk) return res.status(404).json({ message: "Perk not found" });
    res.json(perk);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new perk
router.post("/", async (req, res) => {
  const perk = new Perk(req.body);
  try {
    const newPerk = await perk.save();
    res.status(200).json(newPerk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a perk by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPerk = await Perk.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updatedPerk)
      return res.status(404).json({ message: "Perk not found" });
    res.json(updatedPerk);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a perk by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPerk = await Perk.findByIdAndDelete(req.params.id);
    if (!deletedPerk)
      return res.status(404).json({ message: "Perk not found" });
    res.json({ message: "Perk deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
