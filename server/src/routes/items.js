import { Router } from "express";

import Item from "../models/Item.js";

const router = Router();

router.get("/api/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
});

router.get("/api/items/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(item);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/api/items", async (req, res) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(200).json(savedItem);
  } catch (error) {
    if (error.name === "ValidationError") {
      res.status(400).json({ error, message: "Validation error" });
    } else {
      res.status(500).json({ error, message: "Server error" });
    }
  }
});

router.put("/api/items/:id", async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.json(updatedItem);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error, message: "Validation error" });
    }
    return res.status(500).json({ error, message: "Server error" });
  }
});

router.delete("/api/items/:id", async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);
    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error, message: "Server error" });
  }
});

export default router;
