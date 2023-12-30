import "./App.css";
import React, { useState, useEffect, useRef } from "react";
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
  const [prevTodo, setPrevTodo] = useState([]);
  const [sortedList, setSortedList] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);

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

  const create = (todo) => {
    let id = Math.floor(Math.random() * 10000000);
    fetch("http://localhost:3004/todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: id,
        task: `${todo}`,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTodoList([...todoList, response]);
      });
  };
  const edit = (i) => {
    let index = todoList.findIndex((el) => el.id === i);
    fetch(`http://localhost:3004/todo/${todoList[index].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: `${todoList[index].id}`,
        task: prompt("Измените задачу", `${todoList[index].task}`),
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        todoList[index] = response;
        setTodoList([...todoList]);
      });
  };

  const deletePost = (id) => {
    fetch(`http://localhost:3004/todo/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        setTodoList([...todoList]);
        setTodoList(todoList.filter((todo) => todo.id !== id));
      });
  };

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
      <Context.Provider value={{ todoList, setTodoList, deletePost, edit }}>
        <div className="App">
          <h1>To Do List</h1>
          <AddPost create={create} />
          <button className="sortButton" onClick={sort}>
            Sort
          </button>
          <button className="searchButton" onClick={visible} ref={searchRef}>
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
