import React from "react";
import style from "./NoPage.module.css";
import { useNavigate } from "react-router-dom";

export const NoPage = () => {
  const navigate = useNavigate();
  navigate("/404");

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <div className={style.noPage}>
      <h1>404</h1>
      <h3>Страница не найдена</h3>
    </div>
  );
};
