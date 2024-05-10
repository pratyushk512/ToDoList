import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import { data } from "./schemas/todo_schema.js";
import bodyParser from "body-parser";
const app = express();
const PORT = 3000;
await mongoose.connect('mongodb://localhost:27017/ToDoList_data')
app.use(cors());
app.use(bodyParser.json())
app.get('/',async (req,res)=>{
    
    res.send("hello")
})

app.post('/',async (req,res)=>{
    
    const taskData = new data(req.body)
    console.log("post send");
    console.log(req.body);
    await taskData.save();
    
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});