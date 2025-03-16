import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    topic: { type: String, required: true }
});

// ✅ Explicitly define 'data' as the collection name
const Question = mongoose.model("Question", QuestionSchema, "data"); 

export default Question;
