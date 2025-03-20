import QuizResult from '../models/QuizResultSchema.js'
import Question from "../models/Question.js"; // Ensure this model points to 'data' collection
import register from "../models/RegisterSchema.js";

export const submitQuiz = async (req, res) => {
    try {
        const { userId, answers, selectedTopics } = req.body;

        if (!userId || !answers || !selectedTopics || selectedTopics.length === 0) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Fetch all questions related to the selected topics from MongoDB
        const questions = await Question.find({ topic: { $in: selectedTopics } });

        if (!questions.length) {
            return res.status(404).json({ message: "No questions found for the selected topics" });
        }

        let score = 0;
        const correctAnswers = [];

        // Iterate over fetched questions and compare answers
        questions.forEach((question) => {
            const userAnswer = answers[question._id]; // Get user's answer

            if (userAnswer === question.correctAnswer) {
                score++; // Increase score if correct
            }

            correctAnswers.push({
                questionId: question._id,
                question: question.question,
                correctAnswer: question.correctAnswer,
                selectedAnswer: userAnswer || "No answer",
            });
        });

        // Store the quiz result in the database
        const quizResult = new QuizResult({
            userId,
            selectedTopics,
            score,
            totalQuestions: questions.length,
            answers: correctAnswers,
        });

        await quizResult.save(); // Save result in QuizResult collection

        // Update the user's score and selected topics
        await register.findByIdAndUpdate(id            , {
            $set: { latestScore: score, selectedTopics },
        });

        // Send back response to the frontend
        return res.status(200).json({
            message: "Quiz submitted successfully!",
            score,
            correctAnswers,
            totalQuestions: questions.length,
        });

    } catch (error) {
        console.error("Error submitting quiz:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
