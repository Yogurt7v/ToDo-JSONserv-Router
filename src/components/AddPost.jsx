import React, { useState } from "react";
import style from "./addposts.module.css";
import { useDispatch } from 'react-redux';
import { createTodoAction } from "../actions/createTodoAction";

export const AddPost = () => {    // эта часть сделана.
  const [newTask, setNewTask] = useState();
  const dispatch = useDispatch();

  const create = (todo) => {
    dispatch(createTodoAction(todo));
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
