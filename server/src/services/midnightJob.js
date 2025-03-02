import axios from "axios";
import cron from "node-cron";

// Schedule the job to run at midnight every day
cron.schedule("0 0 * * *", async () => {
  try {
    // Make a POST request to the REST API endpoint
    await axios.post(
      "http://localhost:3000/api/turtles/update-all-emotional-states"
    );
    console.log("Midnight job completed successfully.");
  } catch (err) {
    console.error("Error in midnight job:", err.message);
  }
});
