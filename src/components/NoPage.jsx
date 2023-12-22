import React from "react";
import style from "./NoPage.module.css";

export const NoPage = () => {
  return (
    <div className={style.noPage}>
      <h1>404</h1>
      <h3>Страница не найдена</h3>
    </div>
  );
};
