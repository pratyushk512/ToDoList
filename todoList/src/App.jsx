import { useEffect, useState } from "react";
import { useRef } from "react";
import TodoList from "./components/TodoList";
function App() {
  const [todos,setTodos]=useState([]);
  const inputRef=useRef();
  const handleSubmit = (event) => {
    event.preventDefault();
    const value=inputRef.current.value;
    if(value.length>0){
    setTodos((prevTodos) => [
      ...prevTodos,
      { title: value, id: self.crypto.randomUUID() },
    ]);
  }
    event.target.reset();
  };

  const deleteAllTasks=()=>{
    setTodos([]);
  }

  
  return (
    <>
      <div className=" min-h-screen w-screen bg-gray-900">
        <h1 className="text-3xl font-bold text-center text-white pt-4 mb-12">
          To Do List
        </h1>
        <div className="flex gap-7 pl-7 w-full">
          <div className="flex flex-col w-3/12">
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
                <button type="submit"
                  className="bg-green-700 p-2 text-white text-lg rounded-xl"
                  
                >
                  Add
                </button>
                <button className="bg-red-700 p-2 text-white text-lg rounded-xl" onClick={deleteAllTasks}>
                  Clear All!
                </button>
              </div>
            </form>
          </div>
          <div className="w-9/12 pr-7">
            <h2 className="text-center bg-red-500 text-white text-2xl text-semibold py-3 rounded-t-xl">
              My Task List
            </h2>
            <div className="flex flex-col">
              <TodoList todos={todos} setTodos={setTodos}/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
