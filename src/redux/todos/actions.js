import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ADD_TODO_ENDPOINT,
  DELETE_TODO_ENDPOINT,
  FETCH_ALL,
  UPDATE_TODO_ENDPOINT,
} from "./axiosConfig";

export const fetchAllTodos = createAsyncThunk(
  "todos/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(FETCH_ALL);
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
      await axios.delete(DELETE_TODO_ENDPOINT(_id));
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
    console.log("DATA", data);
    try {
      if (data.parentTodo) {
        const response = await axios.patch(
          UPDATE_TODO_ENDPOINT(data.parentTodo),
          {
            ...data,
          }
        );
        return response.data;
      } else {
        const response = await axios.patch(UPDATE_TODO_ENDPOINT(data._id), {
          ...data,
        });
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);
export const addTodo = createAsyncThunk(
  "todos/addTodo",
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

export const addSubTodo = createAsyncThunk(
  "todos/addSubTodo",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(UPDATE_TODO_ENDPOINT(data.id), {
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
