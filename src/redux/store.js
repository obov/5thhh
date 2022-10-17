import { configureStore, createSlice } from "@reduxjs/toolkit";
const phases = JSON.parse(process.env.REACT_APP_PHASES);

const initialTodos = [
  { id: 333, title: "세계정복", phase: 1 },
  { id: 222, title: "리엑트 공부", phase: 2 },
];

const attachGroups = (initialTodos, phases) => {
  const groups = phases.reduce((pre, phase) => {
    pre[phase.num] = [];
    return pre;
  }, {});
  for (let todo of initialTodos) {
    groups[todo.phase].push({ ...todo, inserted: Date.now() });
  }
  return { data: initialTodos, ...groups };
};

const todo = createSlice({
  name: "todosReducer",
  initialState: attachGroups(initialTodos, phases),
  reducers: {
    add: (state, action) => {
      const newTodo = {
        id: Date.now(),
        ...action.payload,
      };
      state.data.push(newTodo);
      state[action.payload.phase].push({ ...newTodo, inserted: Date.now() });
    },
    remove: (state, action) => {
      return state.data.filter((todo) => todo.id !== action.payload.id);
    },
    up: (state, action) => {
      const index = state.data.findIndex((e) => e.id === action.payload.id);
      state.data[index].phase++;
      const updatedTodo = state.data[index];
      state[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
      state[updatedTodo.phase].push({ ...updatedTodo, inserted: Date.now() });
    },
    down: (state, action) => {
      const index = state.data.findIndex((e) => e.id === action.payload.id);
      state.data[index].phase--;
      const updatedTodo = state.data[index];
      state[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
      state[updatedTodo.phase].push({ ...updatedTodo, inserted: Date.now() });
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
});
