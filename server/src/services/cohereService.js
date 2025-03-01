import { CohereClient } from "cohere-ai";
import dotenv from "dotenv";

dotenv.config();

// Initialize the Cohere client
const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY
});

/**
 * Generate personalized goals based on user profile
 * @param {Object} userProfile - The user profile containing preferences
 * @param {Number} count - Number of goals to generate (default: 5)
 * @returns {Promise<Array>} - Array of generated goals
 */
export const generatePersonalizedGoals = async (userProfile, count = 5) => {
  try {
    // Create a prompt based on user profile
    const prompt = createPromptFromProfile(userProfile, count);

    // Generate goals using Cohere's generate endpoint
    const response = await cohere.generate({
      k: 0,
      maxTokens: 300,
      prompt,
      returnLikelihoods: "NONE",
      stopSequences: ["---"],
      temperature: 0.7
    });

    // Parse the response to extract goals
    const generatedText = response.generations[0].text;
    const goals = parseGoalsFromText(generatedText, count);
    console.log("Parsed goals:", goals);

    // Return the goals with default status
    return goals.map(goal => ({
      goal,
      status: "not completed"
    }));
  } catch (error) {
    console.error("Error generating goals with Cohere:", error);
    throw error;
  }
};

/**
 * Create a prompt for Cohere based on user profile
 * @param {Object} user - User with profile data
 * @param {Number} count - Number of goals to generate
 * @returns {String} - Formatted prompt
 */
const createPromptFromProfile = (user, count) => {
  const profile = user.profiles.sign_up_selections;

  return `Generate ${count} specific, actionable, and feasible sustainability goals for a person with the following profile:

Transportation: ${profile.commute_type}
Commute Distance: ${profile.commute_distance}
Recycling Frequency: ${profile.recycle_frequency}
Garbage Bags Biweekly: ${profile.garbage_bags_biweekly}

The goals should be:
1. Short and concise (maximum 10-15 words)
2. Specific and actionable
3. Focused on sustainability and eco-friendly practices
4. Realistic and feasible to complete within a week
5. Varied in difficulty and impact

Format each goal as a single, short sentence starting with a verb.
Example: "Use a reusable water bottle for one week."

Goals:
1.`;
};

/**
 * Parse generated text to extract individual goals
 * @param {String} text - Generated text from Cohere
 * @param {Number} count - Number of goals to extract
 * @returns {Array} - Array of goal strings
 */
const parseGoalsFromText = (text, count) => {
  // Split by newlines and filter out empty lines
  const lines = text.split("\n").filter(line => line.trim() !== "");

  // Based on the Cohere response format, we need to handle the format differently
  // The goals are coming in as sentences with a pattern like "Verb something: description"
  const goals = [];

  for (const line of lines) {
    // Skip lines that are clearly not goals (too short or don't start with a verb)
    if (line.length < 5) continue;

    // Check if line contains a colon (typical format from Cohere)
    if (line.includes(":")) {
      const goal = line.trim();
      goals.push(goal);
      if (goals.length >= count) break;
    }
    // Also try to capture goals that might not have a colon
    else if (
      line.match(/^[A-Z][a-z]+/) &&
      !line.includes("Goals:") &&
      !line.includes("Example:")
    ) {
      const goal = line.trim();
      goals.push(goal);
      if (goals.length >= count) break;
    }
  }

  return goals.slice(0, count);
};

export default {
  generatePersonalizedGoals
};
