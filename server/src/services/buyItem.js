import { Router } from "express";

import Item from "../models/Item.js";
import User from "../models/User.js";

const router = Router();

router.get("/:id", async (req, res) => {
  try {
    // Step 1: Find the item by ID
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Step 2: Find the admin user
    const adminUser = await User.findOne({ name: "admin" });
    if (!adminUser) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Step 3: Check if the item is already in the admin's items list
    const itemExists = adminUser.profiles.items.some(
      userItem => userItem.item_id === req.params.id
    );

    if (itemExists) {
      return res.status(400).json({ message: "Item already purchased" });
    }

    // Step 4: Add the item to the admin's items array
    adminUser.profiles.items.push({
      availability: true,
      item_id: req.params.id
    });

    // Step 5: Save the updated admin user
    await adminUser.save();

    // Step 6: Return success response
    res.status(200).json({
      item: { ...item.toObject(), availability: true },
      message: "Item purchased successfully"
    });
  } catch (error) {
    console.error("Error purchasing item:", error);
    res.status(500).json({ error: error.message, message: "Server error" });
  }
});

export default router;
