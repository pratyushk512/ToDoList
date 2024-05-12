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
    
    const dbData = await data.find();
    res.send(dbData)
})

app.post('/',async (req,res)=>{
    
    const taskData = new data(req.body)
    console.log("post send");
    console.log(req.body);
    await taskData.save();
    
})

app.post('/:ids',async(req,res)=>{
    console.log(req.params.ids);
    await data.updateMany({id : req.params.ids},{$set : req.body})
    
})

app.delete('/:ids',async(req,res)=>{
    await data.deleteOne({id : req.params.ids})
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});