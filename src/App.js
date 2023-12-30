import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { AddPost } from "./components/AddPost";
import { SearchResult } from "./components/SearchResult";
import { NoPage } from "./components/NoPage";
import { Context } from "./components/Context";
import { NewPageTask } from "./components/NewPageTask";
import { ToDoListResult } from "./components/ToDoListResult";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [searchVisble, setSearchVisble] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prevTodo, setPrevTodo] = useState([]);
  const [sortedList, setSortedList] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    fetch("http://localhost:3004/todo")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        setTodoList(loadedToDos);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const visible = () => {
    setSearchVisble(!searchVisble);
  };

  const sort = () => {
    fetch("http://localhost:3004/todo/", {
      method: "GET",
      headers: { "Content-Type": "application/json;charset=utf-8" },
    })
      .then((response) => response.json())
      .then((data) => {
        setPrevTodo([...data]);
        if (!sortedList) {
          const sortedTasks = data.sort((a, b) => a.task.localeCompare(b.task));

          setTodoList([...sortedTasks]);
          setSortedList(!sortedList);
        }
        if (sortedList) {
          setTodoList([...prevTodo]);
          setSortedList(!sortedList);
        }
      });
  };

  const MainPage = () => {
    return (
      <Context.Provider value={{ todoList, setTodoList }}>
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
      </Context.Provider>
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
