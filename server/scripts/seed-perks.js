import dotenv from "dotenv";
import mongoose from "mongoose";

import Perk from "../src/models/Perk.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";
// Load environment variables
dotenv.config();

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
        companyName: "EcoStore",
        description: "10% off on all reusable products",
        image: "https://example.com/images/ecostore.jpg",
        level: 1,
        link: "https://example.com/deals/ecostore"
      },
      {
        companyName: "GreenTransport",
        description: "Free first ride on electric scooters",
        image: "https://example.com/images/greentransport.jpg",
        level: 3,
        link: "https://example.com/deals/greentransport"
      },
      {
        companyName: "SustainableFood",
        description: "15% discount on organic produce",
        image: "https://example.com/images/sustainablefood.jpg",
        level: 5,
        link: "https://example.com/deals/sustainablefood"
      },
      {
        companyName: "EcoFashion",
        description: "20% off on sustainable clothing",
        image: "https://example.com/images/ecofashion.jpg",
        level: 7,
        link: "https://example.com/deals/ecofashion"
      },
      {
        companyName: "RenewableEnergy",
        description: "Free home energy assessment",
        image: "https://example.com/images/renewableenergy.jpg",
        level: 10,
        link: "https://example.com/deals/renewableenergy"
      }
    ];

    // Insert perks into database
    await Perk.insertMany(perksData);

    console.log(`${perksData.length} perks created successfully`);
    perksData.forEach((perk, index) => {
      console.log(
        `${index + 1}. ${perk.companyName} (Level ${perk.level}) - ${perk.description}`
      );
    });
  } catch (error) {
    console.error("Error seeding perks:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedPerks();
