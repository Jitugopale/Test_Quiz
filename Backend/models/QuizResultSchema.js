import mongoose from "mongoose";

const QuizResultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    selectedTopics: { type: [String], required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    answers: [
        {
            questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
            question: String,
            correctAnswer: String,
            selectedAnswer: String,
        }
    ],
}, { timestamps: true });

const Result = mongoose.model("QuizResult", QuizResultSchema);
export default Result;
