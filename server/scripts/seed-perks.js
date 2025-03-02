import mongoose from "mongoose";

import Perk from "../src/models/Perk.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to create perks
const seedPerks = async () => {
  try {
    // Clear existing perks
    await Perk.deleteMany({});
    console.log("Cleared existing perks");

    // Sample perks data
    const perksData = [
      {
        category: "Shopping",
        companyName: "EcoStore",
        description: "10% off on all reusable products",
        image: "https://example.com/images/ecostore.jpg",
        level: 1,
        link: "https://example.com/deals/ecostore"
      },
      {
        category: "Transportation",
        companyName: "GreenTransport",
        description: "Free first ride on electric scooters",
        image: "https://example.com/images/greentransport.jpg",
        level: 3,
        link: "https://example.com/deals/greentransport"
      },
      {
        category: "Food",
        companyName: "SustainableFood",
        description: "15% discount on organic produce",
        image: "https://example.com/images/sustainablefood.jpg",
        level: 5,
        link: "https://example.com/deals/sustainablefood"
      },
      {
        category: "Fashion",
        companyName: "EcoFashion",
        description: "20% off on sustainable clothing",
        image: "https://example.com/images/ecofashion.jpg",
        level: 7,
        link: "https://example.com/deals/ecofashion"
      },
      {
        category: "Energy",
        companyName: "RenewablePower",
        description: "Free home energy assessment",
        image: "https://example.com/images/renewablepower.jpg",
        level: 10,
        link: "https://example.com/deals/renewablepower"
      }
    ];

    // Insert perks
    const createdPerks = await Perk.insertMany(perksData);
    console.log(`Created ${createdPerks.length} perks`);

    // Close the connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  } catch (error) {
    console.error("Error seeding perks:", error);
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedPerks();
