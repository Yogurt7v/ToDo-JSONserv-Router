import {} from "redux";

const initialState = {
    todoList: [],
    searchVisble: false,
    isLoading: false,
    prevTodo: [],
    sortedList: false,
    id:null,
    task:null,
    resultMessage: "",
}

export const reducer = (state = initialState, action) => {

    const {
      type,
      payload
    } = action

    switch (type) {

        case "LOADING":
          return {
            ...state,
            isLoading: payload,
          }
          case "GET_TODO_LIST":{
            return {
              ...state, todoList: payload
            }
          }
          case "SAVE_TODO_LIST":{
            return {
              ...state, prevTodo: payload
            }
          }
          case "SET_TODO_LIST":{
            return {
              ...state, todoList: payload
            }
          }
          case "SET_PREV_TODO_LIST":{
            return {
              ...state, todoList: state.prevTodo,

            }
          }
          case "SORT":{
            return {
              ...state, sortedList: payload
            }
          }

          case "EDIT_POST":{
            return {
              ...state, todoList: [...state.todoList, payload]
            }
          }
          case "SEARCH": {
            return {
              ...state, todoList: payload
            }
          }

          case "RESULT_MESSAGE":{
            return {
              ...state, resultMessage: payload
            }
          }

  
      default:
        return state;
    }
  };