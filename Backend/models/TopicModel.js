import mongoose from "mongoose";

const TopicSchema = new mongoose.Schema({
//   name: { type: String, required: true },
  topics: { type: [String], required: true }
});

const Topic = mongoose.model("topics", TopicSchema);
export default Topic;
