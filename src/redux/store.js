import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { todo } from "./modules/todoReducer";

const initialRef = { current: null };

const inputRef = createSlice({
  name: "inputRefReducer",
  initialState: initialRef,
  reducers: {
    setRef: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { setRef, removeRef } = inputRef.actions;

const initialPhase = 1;

const phaseNum = createSlice({
  name: "phaseReducer",
  initialState: initialPhase,
  reducers: {
    setPhase: (state, action) => {
      return action.payload;
    },
  },
});

export const { setPhase } = phaseNum.actions;
export default configureStore({
  reducer: {
    todos: todo.reducer,
    inputRef: inputRef.reducer,
    phaseNum: phaseNum.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});
