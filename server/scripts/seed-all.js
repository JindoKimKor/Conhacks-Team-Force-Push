import mongoose from "mongoose";

import Item from "../src/models/Item.js";
import Perk from "../src/models/Perk.js";
import User from "../src/models/User.js";

const MONGODB_URI = "mongodb://localhost:27017/conhacks";

// Connect to MongoDB

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Perk.deleteMany({});
    await Item.deleteMany({});
    console.log("Cleared existing users, perks, and items");

    // Create users
    const newUser = new User({
      email: "newuser@example.com",
      name: "New User",
      password: "password123",
      points: 0,
      profiles: {
        experience: 1,
        goals_assigned: [],
        goals_completed: 0,
        items_available: [],
        items_purchased: [],
        level: 1,
        sign_up_selections: {
          commute_distance: "10-30 km",
          commute_type: "Car",
          garbage_bags_biweekly: "3-5",
          recycle_frequency: "Sometimes"
        },
        streaks: 0
      }
    });

    const experiencedUser = new User({
      email: "experienced@example.com",
      name: "Experienced User",
      password: "password123",
      points: 5000,
      profiles: {
        experience: 80,
        goals_assigned: [],
        goals_completed: 45,
        items_available: [],
        items_purchased: [],
        level: 10,
        sign_up_selections: {
          commute_distance: "0-10 km",
          commute_type: "Bike",
          garbage_bags_biweekly: "0-2",
          recycle_frequency: "Always"
        },
        streaks: 15
      }
    });

    // Save users
    await newUser.save();
    await experiencedUser.save();

    console.log("Users created successfully:");
    console.log("1. New User (Level 1) - Email: newuser@example.com");
    console.log(
      "2. Experienced User (Level 10) - Email: experienced@example.com"
    );
    console.log("Password for both users: password123");

    // Create perks
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
        companyName: "RenewableEnergy",
        description: "Free home energy assessment",
        image: "https://example.com/images/renewableenergy.jpg",
        level: 10,
        link: "https://example.com/deals/renewableenergy"
      }
    ];

    // Insert perks
    await Perk.insertMany(perksData);

    console.log(`${perksData.length} perks created successfully`);
    perksData.forEach((perk, index) => {
      console.log(
        `${index + 1}. ${perk.companyName} (Level ${perk.level}) - ${perk.description} - Category: ${perk.category}`
      );
    });

    // Create items
    const itemsData = [
      {
        category: "Hats",
        cost: 500,
        // Leave empty for user to fill in
        icon: "🐔",
        imageUrl: "https://www.halloweencostumes.ca/chicken-plush-hat.html",
        name: "Chicken Hat"
      },
      {
        category: "Shirts",
        cost: 750,
        // Leave empty for user to fill in
        icon: "👕",
        imageUrl:
          "https://www.ekosport.eu/prana-bear-squeeze-journeyman-p-9-116882",
        name: "Bear Hug Tee"
      },
      {
        category: "Accessories",
        cost: 1200,
        // Leave empty for user to fill in
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

    // Display created items
    createdItems.forEach(item => {
      console.log(
        `- ${item.name} (${item.icon}) - ${item.cost} points - Category: ${item.category}`
      );
    });

    console.log("\nDatabase seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
    console.log("MongoDB connection closed");
  }
};

// Run the seed function
seedDatabase();
