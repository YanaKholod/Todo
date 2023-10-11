import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_TODO_ENDPOINT,
  DELETE_TODO_ENDPOINT,
  FETCH_ALL_TODOS,
  UPDATE_TODO_ENDPOINT,
} from "./axiosConfig";

export const fetchAllTodos = createAsyncThunk(
  "todos/all",
  async ({ page = 1, perPage = 10, sort } = {}, { rejectWithValue }) => {
    try {
      const { sortBy, sortOrder } = sort;
      const response = await axios.get(
        FETCH_ALL_TODOS(page, perPage, sortBy, sortOrder)
      );

      console.loog("fffffffff", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
export const deleteTodoById = createAsyncThunk(
  "todos/delete",
  async (_id, { rejectWithValue }) => {
    try {
      await axios.delete(DELETE_TODO_ENDPOINT);
      return _id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/change",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(UPDATE_TODO_ENDPOINT(data.id), {
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
export const addTodo = createAsyncThunk(
  "todos/addCompany",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(ADD_TODO_ENDPOINT, {
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const switchIsCompleted = createAsyncThunk(
  "todos/switch",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(UPDATE_TODO_ENDPOINT(data.id), {
        ...data,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
