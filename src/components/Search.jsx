import style from "./search.module.css";
import React from "react";
import { useState, useRef } from "react";

export const Search = ({ todoList, setTodoList, searchVisble }) => {
  const [search, setSearch] = useState("");
  const [prevValue, setPrevValue] = useState([]);
  const input = useRef(null);
  const [message, setMessage] = useState("");

  const startSearch = (event) => {
    setSearch(event.target.value);
  };

  const odjCopy = todoList.slice();
  function letsSearch() {
    const foundSearch = todoList.filter((item) => item.task === search);

    if (foundSearch.length === 0) {
      setMessage("Ничего не найдено");
      setPrevValue(odjCopy);
      setTodoList(odjCopy);
    } else {
      setMessage("Найдено");
      setTodoList(foundSearch);
    }
    console.log(odjCopy);
  }

  function clearSearchInput() {
    input.current.value = "";
    setTodoList(prevValue);
    setMessage("");
  }

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
