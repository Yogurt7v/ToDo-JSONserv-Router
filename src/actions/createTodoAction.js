

export const createTodoAction = (todo) =>  (dispatch) => {
    let id = Math.floor(Math.random() * 100000);
    fetch("http://localhost:3004/todo/", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: id,
        task: todo,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        dispatch({type :"EDIT_POST", payload: response})
        // console.log(response);
        // setTodoList([...todoList, response]);
      });
    };

