export const getTodoList = (dispatch) => {
    fetch("http://localhost:3004/todo")
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        dispatch({ type: "GET_TODO_LIST", payload: loadedToDos });
        dispatch({ type: "SAVE_TODO_LIST", payload: loadedToDos });
      })
      .finally(() => {
        dispatch({ type: "LOADING", payload: false });
      });
}