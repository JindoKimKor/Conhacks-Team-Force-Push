import { Router } from "express";

import Item from "../models/Item.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error, message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

// GET all shop items
router.get("/items", async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching shop items:", error);
    res.status(500).json({ message: "Failed to fetch shop items" });
  }
});

// GET shop items by category
router.get("/items/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const items = await Item.find({
      category: new RegExp(category, "iu") // Case insensitive search with Unicode support
    });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching shop items by category:", error);
    res.status(500).json({ message: "Failed to fetch shop items" });
  }
});

// GET shop item by ID
router.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(item);
  } catch (error) {
    console.error("Error fetching shop item:", error);
    res.status(500).json({ message: "Failed to fetch shop item" });
  }
});

export default router;
