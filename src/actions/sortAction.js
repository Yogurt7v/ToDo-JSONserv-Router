
export const sortAction = (dispatch) => {
    fetch("http://localhost:3004/todo/?_sort=id,-views", {
        method: "GET",
        headers: { "Content-Type": "application/json;charset=utf-8" },
      })
        .then((response) => response.json())
        .then((data) => {
            dispatch ({ type: "SET_TODO_LIST", payload: data });
        });
}