import { configureStore } from "@reduxjs/toolkit";
import newTaskReducer from "./slices/newTaskSlice";
import editingTextReducer from "./slices/editingTextSlice";
import editingTaskReducer from "./slices/editingTaskSlice";
import { tasksApi } from "../tasksApi";

const store = configureStore({
  reducer: {
    newTask: newTaskReducer,
    editingText: editingTextReducer,
    editingTask: editingTaskReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
});

export default store;
