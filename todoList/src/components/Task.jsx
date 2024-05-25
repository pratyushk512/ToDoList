import React, { useState } from "react";

function Task({task,setTodos}) {
  console.log(task);

  //delete task
  const deleteTask = async() => {
    fetch(`http://localhost:3000/todos/${task.id}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(deletedDocument => {
        console.log('Document deleted:', deletedDocument);
        // Optionally, update the UI or perform any other action
      })
      .catch(error => console.error('Error deleting document:', error));
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== task.id));
  };

  const changeStatus = async() => {
    
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === task.id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo
      )
    );
    
    updateIsCompleted(task);
  };

  async function updateIsCompleted(task){
    fetch(`http://localhost:3000/todos/${task.id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
})
  .then(response => response.json())
  .then(data => console.log(data.isCompleted))
  .catch(error => console.error('Error:', error));
  };

  let defaultChecked;
  if(task.isCompleted)
    defaultChecked=true;
  else
    defaultChecked=false;
  return (
    <li id={task?.id}>
      <div className="w-full border-red-500 border-2 border-t-0 p-2">
        <span className="text-white text-lg">{task?.title}</span>
        <br />
        <Checkbox defaultChecked={defaultChecked} changeStatus={changeStatus} />
        <button className=" relative left-12 bg-red-700 p-2 w-8 rounded-lg text-white" 
           onClick={deleteTask}
        >X</button>
      </div>
    </li>
  );
}

function Checkbox({defaultChecked,changeStatus }) {
  return (
    <div>
      <input type="checkbox" className=" w-6 h-6 p-2 rounded-full bg-transparent"  defaultChecked={defaultChecked} onChange={changeStatus} />
    </div>
  );
};
export default Task;
