import React from "react";
import { useState } from "react";
import style from "./addposts.module.css";
import { useContext } from "react";
import { Context } from "./Context";
export const AddPost = () => {
  const [newTask, setNewTask] = useState();
  const { todoList, setTodoList } = useContext(Context);

  const create = (todo) => {
    let id = Math.floor(Math.random() * 10000000);
    fetch("http://localhost:3004/todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: id,
        task: `${todo}`,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTodoList([...todoList, response]);
      });
  };

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!newTask) {
      alert("Задача не может быть пустой");
      return;
    }
    create(newTask);
    setNewTask("");
  };

  return (
    <form className={style.allPostsForm} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task"
        onChange={handleChange}
        value={newTask}
      />
      <button>Add new</button>
    </form>
  );
};
