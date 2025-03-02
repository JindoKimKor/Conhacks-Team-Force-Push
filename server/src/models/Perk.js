// server/src/models/Perk.js
import mongoose from "mongoose";

const perkSchema = new mongoose.Schema({
  companyName: {
    required: [true, "Company name is required"],
    type: String
  },
  description: {
    required: [true, "Description is required"],
    type: String
  },
  image: {
    required: [true, "Image URL is required"],
    type: String
  },
  level: {
    min: [1, "Level must be at least 1"],
    required: [true, "Level is required"],
    type: Number
  },
  link: {
    required: [true, "Deal link is required"],
    type: String
  }
});

const Perk = mongoose.model("Perk", perkSchema);

export default Perk;
