import style from "./search.module.css";
import { useState, useRef } from "react";
import React from "react";

export const Search = ({ todoList, setTodoList, searchVisble }) => {
  const [search, setSearch] = useState("");
  const [prevValue, setPrevValue] = useState([...todoList]);
  const input = useRef(null);
  const [message, setMessage] = useState("");

  const startSearch = (event) => {
    setSearch(event.target.value);
  };

  // const backup = [...todoList];
  const letsSearch = () => {
    const foundSearch = todoList.filter((item) => item.task === search);
    if (foundSearch.length === 0) {
      setMessage("Ничего не найдено");
    } else {
      setMessage("Найдено");
      // setPrevValue(todoList);
      setTodoList(foundSearch);
    }
  };

  const clearSearchInput = () => {
    console.log(prevValue);
    setTodoList(prevValue);
    setMessage("");
    input.current.value = "";
  };

  return (
    <div className={style.search}>
      {searchVisble === true ? <div className={style.text}>{message}</div> : ""}
      {searchVisble === true ? (
        <>
          <input
            type="text"
            ref={input}
            className={style.input}
            placeholder="What task are we looking for?"
            onChange={startSearch}
          />
          <div className={style.buttonWrapper}>
            <button className={style.btn} onClick={letsSearch}>
              Искать
            </button>
            <button className={style.btn} onClick={clearSearchInput}>
              Очистить поиск
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
