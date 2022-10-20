import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { attachGroups, setStatus } from "../../utils";

const phases = JSON.parse(process.env.REACT_APP_PHASES);
const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

const initialTodos = [];

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
    return payload;
  }
);
export const patchTodo = createAsyncThunk(
  "todosReducer/patchTodo",
  async (payload) => {
    const data = await (
      await fetch(apiBaseUrl + "todos/" + payload.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
    ).json();
    return payload;
  }
);
export const todo = createSlice({
  name: "todosReducer",
  initialState: setStatus(attachGroups(initialTodos, phases), "init"),
  reducers: {
    add: (state, action) => {
      const newTodo = {
        id: Date.now(),
        ...action.payload,
      };
      state.data.push(newTodo);
      state[action.payload.phase].push(newTodo);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTodos.pending, (state, action) => {
      return setStatus(state, "loading");
    });
    builder.addCase(getTodos.fulfilled, (state, action) => {
      return setStatus(
        attachGroups(action.payload, phases, {
          groupName: "num",
          mapName: "phase",
        }),
        "fulfilled"
      );
    });

    builder.addCase(postNewTodo.rejected, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      state[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
    });

    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.data = state.data.filter((todo) => todo.id !== action.payload.id);
      state[action.payload.phase] = state[action.payload.phase].filter(
        (todo) => todo.id !== action.payload.id
      );
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.data.push(action.payload);
      state[action.payload.phase].push(action.payload);
    });

    builder.addCase(patchTodo.fulfilled, (state, action) => {
      const index = state.data.findIndex((e) => e.id === action.payload.id);
      const newTodo = { ...state.data[index], ...action.payload };
      if (action.payload.phase) {
        const beforePhase = state.data[index].phase;
        state[beforePhase] = state[beforePhase].filter(
          (todo) => todo.id !== action.payload.id
        );
        state[action.payload.phase].push(newTodo);
      } else {
        state[state.data[index].phase] = state[state.data[index].phase].map(
          (todo) => (todo.id === action.payload.id ? newTodo : todo)
        );
      }
      state.data[index] = newTodo;
    });
  },
});

export const { add } = todo.actions;
