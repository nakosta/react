import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getTasks,
  createTask,
  editTask,
  deleteFetch,
  isCompleted,
} from "../../apiAxios";

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, thunkAPI) => {
    try {
      const data = await getTasks();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNewTask = createAsyncThunk(
  "tasks/createNewTask",
  async (taskTitle, thunkAPI) => {
    try {
      const { user_id, ...task } = await createTask(taskTitle);
      return task;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateTaskById = createAsyncThunk(
  "tasks/updateTaskById",
  async ({ id, updatedText }, thunkAPI) => {
    try {
      const updatedTask = await editTask(updatedText, id);
      return updatedTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteTaskById = createAsyncThunk(
  "tasks/deleteTaskById",
  async (id, thunkAPI) => {
    try {
      await deleteFetch(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const toggleTask = createAsyncThunk(
  "tasks/toggleTask",
  async (id, thunkAPI) => {
    try {
      await isCompleted(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createNewTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTaskById.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        );
      })
      .addCase(deleteTaskById.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      })
      .addCase(toggleTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.map((task) =>
          task.id === action.payload
            ? { ...task, isCompleted: !task.isCompleted }
            : task
        );
      });
  },
});

export default tasksSlice.reducer;
