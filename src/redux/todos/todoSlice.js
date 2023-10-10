import { createSlice } from "@reduxjs/toolkit";
import {
  deleteCompanyById,
  updateTodo,
  addTodo,
  switchIsCompleted,
} from "./actions";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    error: null,
    isLoggedIn: false,
    dropdownCompanies: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteCompanyById.pending, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(deleteCompanyById.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(deleteCompanyById.rejected, (state, action) => {
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
      })
      .addCase(switchIsCompleted.pending, (state, action) => {
        state.isLoggedIn = true;
        state.error = null;
      })
      .addCase(switchIsCompleted.fulfilled, (state, action) => {
        state.error = null;
      })
      .addCase(switchIsCompleted.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const todoReducer = todoSlice.reducer;
