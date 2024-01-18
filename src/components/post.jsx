import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./post.module.css";
import { useSelector } from "react-redux";

export const Post = ({ key, task }) => {

  const todoList = useSelector((state) => state.todoList);
  const [closed, setClosed] = useState(true);
  const edit = (i) => {
    let index = todoList.findIndex((el) => el.id === i);
    fetch(`http://localhost:3004/todo/${todoList[index].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: `${todoList[index].id}`,
        task: prompt("Измените задачу", `${todoList[index].task}`),
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        todoList[index] = response;
        // setTodoList([...todoList]);
      });
  };

  const deletePost = (id) => {
    fetch(`http://localhost:3004/todo/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        // setTodoList([...todoList]);
        // setTodoList(todoList.filter((todo) => todo.id !== id));
      });
  };

  return (
    <div className={style.wrapperClosed} onClick={() => setClosed(!closed)}>
      {closed ? (
        <>
          <div className={style.postWrapper}>
            <span className={style.postTitle}> {task.task}</span>
          </div>
        </>
      ) : (
        <>
          <div className={style.postWrapper}>
            <Link to={`task/${task.id}`} className={style.postLink}>
              {task.task}
            </Link>
            <div className={style.postButtons}>
              <div className={style.buttonWrapper}>
                <button onClick={() => edit(task.id)}>Edit</button>
                <button onClick={() => deletePost(task.id)}>Delete</button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
