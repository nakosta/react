import axios from "axios";

const getAuthToken = () => localStorage.getItem("authToken");

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function registration(order) {
  try {
    const { data } = await apiClient.post("/users/register", order);
    return data;
  } catch (error) {
    console.error("Registration error:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Registration failed");
  }
}

export async function login(emailPassword) {
  try {
    const { data } = await apiClient.post("/auth/login", emailPassword);
    return data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw new Error(error.response?.data.message || "Login failed");
  }
}

export async function createTask(task) {
  try {
    const { data } = await apiClient.post("/todos", { title: task });
    return data;
  } catch (error) {
    console.error("Create task error:", error.response?.data || error.message);
    throw error;
  }
}

export async function getTasks() {
  try {
    const { data } = await apiClient.get("/todos");
    return data;
  } catch (error) {
    console.error("Get tasks error:", error.response?.data || error.message);
    throw error;
  }
}

export async function editTask(task, id) {
  try {
    const { data } = await apiClient.patch(`/todos/${id}`, { title: task });
    return data;
  } catch (error) {
    console.error("Edit task error:", error.response?.data || error.message);
    throw error;
  }
}

export async function isCompleted(id) {
  try {
    const { data } = await apiClient.patch(`/todos/${id}/isCompleted`);
    return data;
  } catch (error) {
    console.error(
      "Mark as completed error:",
      error.response?.data || error.message
    );
    throw error;
  }
}

export async function deleteFetch(id) {
  try {
    const { data } = await apiClient.delete(`/todos/${id}`);
    return data;
  } catch (error) {
    console.error("Delete task error:", error.response?.data || error.message);
    throw error;
  }
}
