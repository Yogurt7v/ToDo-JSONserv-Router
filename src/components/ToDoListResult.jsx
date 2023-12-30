import React from "react";
import Post from "./post";
import { useContext } from "react";
import { Context } from "./Context";
export const ToDoListResult = () => {
  const { todoList } = useContext(Context);

  return todoList.map((todo, index) => (
    <Post key={todo.id} task={todo} index={index} />
  ));
};
