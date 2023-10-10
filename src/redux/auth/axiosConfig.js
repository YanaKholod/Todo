import axios from "axios";

axios.defaults.baseURL = "https://banking-5ah7.onrender.com/api";

export const REGISTER_ENDPOINT = "/auth/register";

export const LOGIN_ENDPOINT = "/auth/login";

export const LOGOUT_ENDPOINT = "/auth/logout";

export const CURRENT_ENDPOINT = "/auth/current";

export default axios;
export const tokenHeaders = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};
