import style from "./search.module.css";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchListAction } from "../actions/searchListAction";

export const SearchResult = ({ searchVisble }) => {

  const resultMessage = useSelector((state) => state.resultMessage);  
  const [search, setSearch] = useState("");
  const input = useRef(null);
  const dispatch = useDispatch();

  const startSearch = (event) => {
    return setSearch(event.target.value);
  };

  const searchedList = (word) => {
    dispatch(searchListAction(word));
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
