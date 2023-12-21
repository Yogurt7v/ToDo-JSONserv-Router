import "./App.css";
import React, { useRef } from "react";
import { AddPost } from "./components/AddPost";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useParams } from "react-router-dom";
import Post from "./components/post";
import { Search } from "./components/Search";
// import NewPageTask from "./components/SinglePost";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [searchVisble, setSearchVisble] = useState(false);
  const [sortedList, setSortedList] = useState(false);
  const [prevTodo, setPrevTodo] = useState([...todoList]);
  const ref = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef(null);
  let { id } = useParams();

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
    if (searchVisble) {
      searchRef.current.addClassName = "active";
      searchRef.current.style.backgroundColor = "white";
      searchRef.current.style.color = "black";
    } else {
      searchRef.current.addClassName = "disactive";
      searchRef.current.style.backgroundColor = "#5986db";
      searchRef.current.style.color = "white";
    }
  };

  const sort = () => {
    setPrevTodo([...todoList]);
    if (!sortedList) {
      const sortedArr = [...todoList].sort((a, b) =>
        a.task.localeCompare(b.task)
      );
      setTodoList([...sortedArr]);
      setSortedList(!sortedList);
      ref.current.style.backgroundColor = "#5986db";
      ref.current.style.color = "white";
    }
    if (sortedList) {
      setTodoList([...prevTodo]);
      setSortedList(!sortedList);
      ref.current.style.backgroundColor = "white";
      ref.current.style.color = "black";
    }
  };

  const NewPageTask = () => {
    const { id } = useParams();

    let message = todoList.find((el) => el.id === Number(id)).task;
    console.log(message);
    return (
      <>
        <div className="NewPage">
          <div className="NewPageWrapper">
            <h1>{message}</h1>
          </div>
        </div>
      </>
    );
  };

  const MainPage = () => {
    return (
      <div className="App">
        <h1>To Do List</h1>
        <AddPost create={create} />
        <button className="sortButton" onClick={sort} ref={ref}>
          Sort
        </button>
        <button className="searchButton" onClick={visible} ref={searchRef}>
          Search
        </button>
        <Search
          todoList={todoList}
          setTodoList={setTodoList}
          prevTodo={prevTodo}
          setPrevTodo={setPrevTodo}
          searchVisble={searchVisble}
        ></Search>
        {isLoading ? (
          <div className="loaderWrapper">
            <div class="loader"></div>
          </div>
        ) : (
          todoList.map((todo, index) => (
            <Post
              key={todo.id}
              task={todo}
              index={index}
              deletePost={deletePost}
              edit={edit}
            />
          ))
        )}
        <p className="AppFooter"></p>
      </div>
    );
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="task/:id" element={<NewPageTask />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
