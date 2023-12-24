import style from "./search.module.css";
import { useState, useRef, useEffect } from "react";
import React from "react";

export const Search = ({ todoList, setTodoList, searchVisble }) => {
  const [search, setSearch] = useState("");
  const input = useRef(null);
  const [resultMessage, setResultMessage] = useState("");

  const startSearch = (event) => {
    return setSearch(event.target.value);
  };

  const searchedList = (word) => {
    fetch(`http://localhost:3004/todo/?q=${word}`, {
      method: "GET",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        if (response.length === 0) {
          setResultMessage("Ничего не найдено");
        } else {
          setTodoList([...response]);
        }
      })
      .finally(() => {});
  };
  const letsSearch = () => {
    searchedList(search);
  };

  const clearSearchInput = () => {
    searchedList("");
  };

  return (
    <div className={style.search}>
      {searchVisble === true ? (
        <div className={style.text}>{resultMessage}</div>
      ) : (
        ""
      )}
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
