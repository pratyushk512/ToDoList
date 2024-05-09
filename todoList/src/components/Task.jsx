import React from "react";

function Task({task,setTodos}) {
  const deleteTask = () => {
    setTodos((prevTodos) => prevTodos.filter((item) => item.id !== task.id));
  };
  const changeStatus = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === task.id
          ? { ...todo, is_completed: !todo.is_completed }
          : todo
      )
    );
  };
  return (
    <li id={task?.id}>
      <div className="w-full border-red-500 border-2 border-t-0 p-2">
        <span className="text-white text-lg">{task?.title}</span>
        <br />
        <input type="checkbox" className=" w-6 h-6 p-2 rounded-full bg-transparent" onChange={changeStatus}></input>
        <button className=" relative left-12 bg-red-700 p-2 w-8 rounded-lg text-white" 
           onClick={deleteTask}
        >X</button>
      </div>
    </li>
  );
}

export default Task;
