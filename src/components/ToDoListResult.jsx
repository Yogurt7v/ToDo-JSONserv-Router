import React from "react";
import Post from "./post";
import { useSelector } from "react-redux";
export const ToDoListResult = () => {

  const todoList = useSelector((state) => state.todoList);

  return todoList.map((todo, index) => (
    <Post key={todo.id} task={todo} index={index} />
  ));
};
