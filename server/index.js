import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ToDoList_Data');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Schema
const todoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
});

const Todo = mongoose.model('Todo', todoSchema);

const app = express(); 
const port=3000;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
};

app.use(cors(corsOptions));



//fetch all todos
app.get('/todos', async (req, res) => {
  try {
      const todos = await Todo.find();
      res.json(todos);
  } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'Internal Server Error' });
  }
});

//update isCompleted
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch the document by ID
    const document = await Todo.findOne({id});
    if (!document) {
      return res.status(404).send('Document not found');
    }
    
    // Toggle the boolean field
    document.isCompleted = !document.isCompleted;

    // Save the updated document
    const updatedDocument = await document.save();

    res.send(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating document');
  }
});

//add new data to db
app.post("/newTodo",async (req,res)=>{
  let todo=new Todo(req.body);
  await todo.save();

  console.log(todo);
  res.json(todo);
})

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
   
    const deletedDocument = await Todo.findOneAndDelete({ id });
    if (!deletedDocument) {
      return res.status(404).send('Document not found');
    }

    res.send(deletedDocument);
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).send('Error deleting document');
  }
});

app.delete('/todos',async(req,res)=>{
  try {
    const result = await Todo.deleteMany({});
    res.send(result);
  } catch (error) {
    console.error('Error deleting documents:', error);
    res.status(500).send('Error deleting documents');
  }
})

app.listen(port,()=>{
    console.log(`Server running at port ${port}`);
});