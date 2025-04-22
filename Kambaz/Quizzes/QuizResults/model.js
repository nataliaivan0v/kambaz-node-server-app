import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("QuizResultsModel", schema);
export default model;