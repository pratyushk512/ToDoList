import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id : String,
    title : String,
    isCompleted : Boolean
}) 

export const data = mongoose.model('todos',TodoSchema) 