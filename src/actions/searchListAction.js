export const searchListAction = (word) =>(dispatch) => {
    fetch(`http://localhost:3004/todo/?q=${word}`, {
        method: "GET",
      })
        .then((rawResponse) => rawResponse.json())
        .then((response) => {
          if (response.length === 0) {
            dispatch({ type: "RESULT_MESSAGE", payload: "Ничего не найдено" });
          } else {
            dispatch({ type: "SEARCH", payload: response });
            dispatch({ type: "RESULT_MESSAGE", payload: "" });
          }
        })
};