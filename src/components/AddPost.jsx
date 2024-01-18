import React from "react";
import { useState } from "react";
import style from "./addposts.module.css";
import { useDispatch } from 'react-redux';
import { createTodoAction } from "./createTodoAction";

export const AddPost = () => {
  const [newTask, setNewTask] = useState();
  const dispat = useDispatch();

  const create = (todo) => {
    dispat(createTodoAction(todo));
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
