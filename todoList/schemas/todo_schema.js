import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    title : String
}) 

export const data = mongoose.model('todos',TodoSchema) 