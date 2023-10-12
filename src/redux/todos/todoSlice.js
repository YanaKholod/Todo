import { createSlice } from "@reduxjs/toolkit";
import {
  updateTodo,
  addTodo,
  switchIsCompleted,
  deleteTodoById,
  fetchAllTodos,
} from "./actions";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    error: null,
    isLoggedIn: false,
    todosArray: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.todosArray = action.payload.todos;
        state.error = null;
      })
      .addCase(fetchAllTodos.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTodoById.pending, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(deleteTodoById.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(deleteTodoById.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTodo.pending, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(addTodo.pending, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { updateTodosArray } = todoSlice.actions;

export const todoReducer = todoSlice.reducer;
