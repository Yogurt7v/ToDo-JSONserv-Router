export const deleteAction = (id) => (dispatch) => {
    fetch(`http://localhost:3004/todo/${id}`, {
      method: "DELETE",
    })
}