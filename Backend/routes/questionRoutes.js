import express from "express";
import { getQuestionsByTopic } from "../controllers/QuestionController.js";

const Selectrouter = express.Router();

Selectrouter.get("/:topic", getQuestionsByTopic);  // Fetch questions by topic

export default Selectrouter;
