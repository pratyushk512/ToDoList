import React from "react";
import Task from "./Task";

function TodoList({ todos,setTodos }) {
  return (
    <ul className="todo_list">
      {todos && todos.length > 0 ? (
        todos?.map((task, index) => <Task key={index} task={task} setTodos={setTodos} />)
      ) : (
        <img className=" h-72 w-72 opacity-5 pt-5 left-52" src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjY4Ni0yNTMtdi5qcGc.jpg" />
      )}
    </ul>
  );
}

export default TodoList;
