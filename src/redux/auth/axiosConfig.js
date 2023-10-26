import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

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
