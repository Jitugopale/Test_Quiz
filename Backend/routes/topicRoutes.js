import express from "express";
import { getTopics } from "../controllers/TopicController.js";

const topicRoutes = express.Router();

topicRoutes.get("/topics", getTopics); // GET request to fetch topics

export default topicRoutes;
