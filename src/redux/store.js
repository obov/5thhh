import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = [
  { id: 333, title: "세계정복", phase: 1 },
  { id: 222, title: "리엑트 공부", phase: 2 },
];

const todo = createSlice({
  name: "todosReducer",
  initialState,
  reducers: {
    add: (state, action) => {
      const { payload } = action;
      state.push({
        id: new Date().getTime(),
        phase: 1,
        ...payload,
      });
    },
    remove: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
    up: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      state[index].phase++;
    },
    down: (state, action) => {
      const index = state.findIndex((e) => e.id === action.payload.id);
      state[index].phase--;
    },
  },
});

export const { add, remove, up, down } = todo.actions;
export default configureStore({ reducer: todo.reducer });
