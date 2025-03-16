import Question from "../models/Question.js"; // Ensure this model points to 'data' collection

export const getQuestionsByTopic = async (req, res) => {
    const { topic } = req.params;

    try {
        const questions = await Question.find({ topic: topic }); // Simple query

        if (questions.length === 0) {
            return res.status(404).json({ message: `No questions found for topic: ${topic}` });
        }

        return res.status(200).json({ questions });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
