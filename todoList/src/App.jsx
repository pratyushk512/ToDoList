import { useEffect, useState } from "react";
import { useRef } from "react";
import TodoList from "./components/TodoList";
function App() {
  const [todos, setTodos] = useState([]);
  
  const inputRef = useRef();
  
  useEffect(()=>{
    
    const fetchAllTodos = async () => {
      try {
          const response = await fetch('http://localhost:3000/todos');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setTodos(data);
      } catch (error) {
          console.error('Error fetching todos:', error);
      }
  };
  fetchAllTodos();
  },[])

  
  const handleSubmit =async (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    let newTodo={
      title: value, 
      id: self.crypto.randomUUID(), 
      isCompleted: false
    }
    if (value.length > 0) {
      setTodos((prevTodos) => [
        ...prevTodos,
        newTodo,
      ]);
      fetchData(newTodo);
    }
    event.target.reset();
  };

  async function fetchData(newTodo){
    const response=await fetch(`http://localhost:3000/newTodo`,{
        method:'POST',
        body:JSON.stringify(newTodo),
        headers:{
          'Content-Type':'application/json'
        }
      })
      const data=await response.json()
      console.log(data);
  };
  
  const deleteAllTasks = () => {
    fetch(`http://localhost:3000/todos`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedDocument => {
        console.log('Documents deleted:', deletedDocument);
        // Optionally, update the UI or perform any other action
      })
      .catch(error => console.error('Error deleting document:', error));
    setTodos([]);
  };

  const todosCompleted = todos.filter(
    (todo) => todo.isCompleted === true
  ).length;

  return (
    <>
      <div className=" min-h-screen w-screen bg-gray-900">
        <h1 className="text-3xl font-bold text-center text-white pt-4 mb-12">
          To Do List
        </h1>
        <div className="flex gap-7 pl-7 w-full ">
          <div className="flex flex-col w-3/12 ">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="newTask"
                className="text-white font-semibold text-2xl pl-3"
              >
                Add new Task
                <input
                  id="newTask"
                  ref={inputRef}
                  className="rounded h-14 w-96 border-blue-500 border-spacing-3 px-1 text-black"
                />
              </label>
              <div className="flex justify-between mt-2">
                <button
                  type="submit"
                  className="bg-green-700 p-2 text-white text-lg rounded-xl"
                >
                  Add
                </button>
                
              </div>
            </form>
            <button
                  className=" relative w-24 left-72 -top-11 bg-red-700 p-2 text-white text-lg rounded-xl"
                  onClick={deleteAllTasks}
                >
                  Clear All!
              </button>
            <div className=" w-full h-40 bg-red-500 border-blue-700 border-4 rounded-lg border-double mt-4 ">
              <h2 className="p-4 text-2xl font-semibold text-white">Tasks Completed</h2>
              <div className="relative left-5 w-16 h-16 rounded-full border-white border-4">
                <p className="relative left-3 top-3 text-lg text-white">{todosCompleted}/{todos.length}</p>
              </div>
            </div>
          </div>
          <div className="w-9/12 pr-7 ">
            <h2 className="text-center bg-red-500 text-white text-2xl text-semibold py-3 rounded-t-xl">
              My Task List
            </h2>
            <div className="flex flex-col">
              <TodoList todos={todos} setTodos={setTodos} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;