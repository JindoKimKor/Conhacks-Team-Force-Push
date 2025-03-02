import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  cost: {
    min: 0,
    required: true,
    type: Number,
    validate: {
      message: "Cost must be a non-negative integer",
      validator: value => Number.isInteger(value)
    }
  },
  imageUrl: {
    required: false,
    type: String,
    validate: {
      message: "Invalid URL format",
      validator: value => {
        return URL.canParse(value);
      }
    }
  },
  name: {
    require: true,
    type: String
  }
});

const Item = mongoose.model("Item", itemSchema);

export default Item;
