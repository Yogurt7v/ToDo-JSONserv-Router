import { Link } from "react-router-dom";
import { useState } from "react";
import style from "./post.module.css";
import NewPageTask from "./SinglePost";

export const Post = ({ task, deletePost, index, edit }) => {
  const [closed, setClosed] = useState(true);

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
          <Link to={`task/${task.id}`} className={style.postLink}>
            {task.task}
          </Link>
          <div className={style.postButtons}>
            <div className={style.buttonWrapper}>
              <button onClick={() => edit(task.id)}>Edit</button>
              <button onClick={() => deletePost(task.id)}>Delete</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Post;
