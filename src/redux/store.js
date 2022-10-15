import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialTodos = [
  { id: 333, title: "세계정복", phase: 1 },
  { id: 222, title: "리엑트 공부", phase: 2 },
];

const todo = createSlice({
  name: "todosReducer",
  initialState: initialTodos,
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

const initialRef = { current: null };

const inputRef = createSlice({
  name: "inputRefReducer",
  initialState: initialRef,
  reducers: {
    setRef: (state, action) => {
      return action.payload;
    },
  },
});

export const { setRef } = inputRef.actions;

export default configureStore({
  reducer: { todos: todo.reducer, inputRef: inputRef.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
