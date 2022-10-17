import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
const phases = JSON.parse(process.env.REACT_APP_PHASES);
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const initialTodos = [];

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

const setStatus = (state, status) => ({ ...state, status });

export const getTodos = createAsyncThunk("todosReducer/getTodos", async () => {
  const data = await (await fetch(apiBaseUrl + "todos")).json();
  return data;
});

export const postNewTodo = createAsyncThunk(
  "todosReducer/postNewTodo",
  async (payload) => {
    const data = await (
      await fetch(apiBaseUrl + "todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    ).json();
    return data;
  }
);

export const deleteTodo = createAsyncThunk(
  "todosReducer/deleteTodo",
  async (payload) => {
    const data = await (
      await fetch(apiBaseUrl + "todos/" + payload.id, {
        method: "DELETE",
      })
    ).json();
    return data;
  }
);
const todo = createSlice({
  name: "todosReducer",
  initialState: setStatus(attachGroups(initialTodos, phases), "init"),
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
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      state[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
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
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state, action) => {
      return setStatus(state, "loading");
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      return setStatus(attachGroups(action.payload, phases), "fulfilled");
    });

    builder.addCase(postNewTodo.rejected, (state, action) => {
      const newState = { ...state };
      newState.data = state.data.filter(
        (todo) => todo.id !== action.payload.id
      );
      newState[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
      return newState;
    });

    builder.addCase(deleteTodo.rejected, (state, action) => {
      const newState = { ...state };
      state.data.push(action.payload);
      state[action.payload.phase].push(action.payload);
      return newState;
    });
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
  devTools: process.env.NODE_ENV === "development",
});
