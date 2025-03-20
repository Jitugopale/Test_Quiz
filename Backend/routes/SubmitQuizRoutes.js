import express from "express";
import { submitQuiz } from "../controllers/SubmitQuizController.js";

const Submitrouter = express.Router();

Submitrouter.post("/submitquiz", submitQuiz);  // Fetch questions by topic

export default Submitrouter;
