import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

export const DELETE_TODO_ENDPOINT = (_id) => `/todos/delete/${_id}`;

export const UPDATE_TODO_ENDPOINT = (id) => `/todos/change/${id}`;

export const ADD_TODO_ENDPOINT = "/todos";

export const FETCH_ALL = "/todos/all";

export default axios;
