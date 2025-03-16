import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import Topic from "../models/TopicModel.js"; // Import the MongoDB model

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const topicsFilePath = path.join(__dirname, "../data/quizTopics.json");

export const getTopics = async (req, res) => {
    try {
        // Read topics from JSON file
        const topicsData = fs.readFileSync(topicsFilePath, "utf-8"); 
        const questions = JSON.parse(topicsData);

        // Extract unique topics
        const topicsArray = [...new Set(questions.map(q => q.topic))];

        // Send response first
        res.status(200).json({ topics: topicsArray });

        // Save topics to MongoDB
        const topicsEntry = new Topic({ topics: topicsArray });
        await topicsEntry.save();

    } catch (error) {
        console.error("Error fetching topics:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
