import cors from "cors";
import dotenv from "dotenv";
import express, { json, urlencoded } from "express";

import connectDB from "./src/config/database.js";
import router from "./src/routes/index.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// ------ Create the Express app -----
const app = express();

// ------ Configure the app ------
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"]
  })
);

// ------ json parsers ------
app.use(json());
app.use(urlencoded({ extended: true }));

app.use(`/api`, router);

// ------ Start the server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
