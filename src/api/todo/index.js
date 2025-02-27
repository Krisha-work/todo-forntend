// import instance from "../../utils/apiHelper";

import instance from "../../utils/apiHelper";

const ADD_TODO_POST_URL = "todo/todoadd";
const GET_TODOS_GET_URL = "todo/todos";
const TODO_URL = "todo/todo"
const DELETE_TODO_URL = 'todo/remove'

export const addTodo = (data) => {
  return instance.post(`${ADD_TODO_POST_URL}`, data);
};

export const getAllTodo = () => {
  return instance.get(`${GET_TODOS_GET_URL}`);
};

export const getTodo = (id) => {
    return instance.get(`${TODO_URL}/${id}`)
}

export const updateTodo = (id, data) => {
    return instance.put(`${TODO_URL}/${id}`, data)
}

export const deleteTodo = (id) => {
    return instance.delete(`${DELETE_TODO_URL}/${id}`)
}