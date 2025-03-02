import mongoose from "mongoose";

import Item from "../src/models/Item.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to create items
const seedItems = async () => {
  try {
    // Clear existing items
    await Item.deleteMany({});
    console.log("Cleared existing items");

    // Sample items data based on the Shop.tsx file
    const itemsData = [
      {
        category: "Hats",
        cost: 500,
        icon: "🐔",
        imageUrl: "https://www.halloweencostumes.ca/chicken-plush-hat.html",
        name: "Chicken Hat"
      },
      {
        category: "Shirts",
        cost: 750,
        icon: "👕",
        imageUrl:
          "https://www.ekosport.eu/prana-bear-squeeze-journeyman-p-9-116882",
        name: "Bear Hug Tee"
      },
      {
        category: "Accessories",
        cost: 1200,
        icon: "💝",
        imageUrl:
          "https://static.vecteezy.com/system/resources/previews/004/651/797/non_2x/heart-wand-in-cartoon-style-isolated-free-vector.jpg",
        name: "Heart Wand"
      },
      {
        category: "Accessories",
        cost: 1000,
        // Leave empty for user to fill in
        icon: "👜",
        imageUrl:
          "https://www.mastermindtoys.com/products/amuseable-rainbow-bag",
        name: "Rainbow Bag"
      },
      {
        category: "Hats",
        cost: 2000,
        // Leave empty for user to fill in
        icon: "👑",
        imageUrl:
          "https://t4.ftcdn.net/jpg/02/04/25/71/360_F_204257104_jnqWGXAbNuyORkJG9yw9tdfutvkmJblt.jpg",
        name: "Crown"
      },
      {
        category: "Footwear",
        cost: 300,
        // Leave empty for user to fill in
        icon: "🧦",
        imageUrl: "https://socco78.com/products/white-striped-socks-royal",
        name: "Blue Socks"
      }
    ];

    // Insert items
    const createdItems = await Item.insertMany(itemsData);
    console.log(`Created ${createdItems.length} items`);

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding items:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedItems();
