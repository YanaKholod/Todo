import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, {
  CURRENT_ENDPOINT,
  LOGIN_ENDPOINT,
  LOGOUT_ENDPOINT,
  REGISTER_ENDPOINT,
  tokenHeaders,
} from "./axiosConfig";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(REGISTER_ENDPOINT, credentials);
      tokenHeaders.set(data.token);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(LOGIN_ENDPOINT, user);

      tokenHeaders.set(data.token);

      return data;
    } catch (error) {
      return rejectWithValue(
        (await error.response.data.message) || "An error occurred"
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (user, { rejectWithValue }) => {
    try {
      await axios.post(LOGOUT_ENDPOINT, user);

      tokenHeaders.unset();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "auth/current",
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    token && tokenHeaders.set(token);
    try {
      const response = await axios.get(CURRENT_ENDPOINT);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export default axios;
