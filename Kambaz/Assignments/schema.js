import mongoose from "mongoose";
const assignmentsSchema = new mongoose.Schema({
   _id: String,
   title: String,
   course: String,
 },
 { collection: "assignments" }
);
export default assignmentsSchema;