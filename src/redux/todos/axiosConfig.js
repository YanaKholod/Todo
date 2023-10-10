import axios from "axios";

axios.defaults.baseURL = "https://banking-5ah7.onrender.com/api";

export const DELETE_TODO_ENDPOINT = (_id) => `/todos/delete/${_id}`;

export const UPDATE_TODO_ENDPOINT = (id) => `/todos/change/${id}`;

export const ADD_TODO_ENDPOINT = "/todos/";

export default axios;
