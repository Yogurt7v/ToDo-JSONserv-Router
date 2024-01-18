import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AddPost } from "./components/AddPost";
import { SearchResult } from "./components/SearchResult";
import { NoPage } from "./components/NoPage";
// import { Context } from "./components/Context";
import { NewPageTask } from "./components/NewPageTask";
import { ToDoListResult } from "./components/ToDoListResult";
import { useDispatch } from "react-redux";
import { getTodoList } from "./components/getTodoListAction";
import { useSelector } from "react-redux";
import { sortAction } from "./components/sortAction";



function App() {

  const dispatch = useDispatch();
  // const todoList = useSelector((state) => state.todoList);
  let isSorted = useSelector((state) => state.sortedList);


  const [searchVisble, setSearchVisble] = useState(false);
  const isLoading = useSelector((state) => state.isLoading);
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: "LOADING", payload: true });
    dispatch(getTodoList)

  }, []);

  const visible = () => {
    setSearchVisble(!searchVisble);
  };

  const sort = () => {
    if(!isSorted){
      dispatch(sortAction)
      dispatch ({ type: "SORT", payload: true });
    }if (isSorted){
      dispatch({ type: "SET_PREV_TODO_LIST",});
      dispatch ({ type: "SORT", payload: false });
    }

  };

  const MainPage = () => {
    return (
        <div className="App">
          <h1>To Do List</h1>
          <AddPost />
          <button className="sortButton" onClick={sort}>
            Sort
          </button>
          <button className="searchButton" onClick={visible}>
            Search
          </button>
          <SearchResult searchVisble={searchVisble}></SearchResult>
          {isLoading ? (
            <div className="loaderWrapper">
              <div class="loader"></div>
            </div>
          ) : (
            <ToDoListResult />
          )}
        </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="task/:id" element={<NewPageTask />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/404" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
