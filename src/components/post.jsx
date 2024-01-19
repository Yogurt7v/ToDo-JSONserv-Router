import { Link } from "react-router-dom";
import {  useState } from "react";
import style from "./post.module.css";
import { useSelector, useDispatch } from "react-redux";
import { editAction } from "../actions/editAction";
import { getTodoList } from "../actions/getTodoListAction";
import { deleteAction } from "../actions/deleteAction";

export const Post = ({ task}) => {

  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todoList);
  const [closed, setClosed] = useState(true);
  const edit = (i) => {
    let index = todoList.findIndex((el) => el.id === i);
    dispatch(editAction(todoList, index));
    dispatch(getTodoList)
  };

  const deletePost = (id) => {
    dispatch(deleteAction(id))
    dispatch(getTodoList)
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
