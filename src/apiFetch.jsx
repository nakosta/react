const getAuthToken = () => localStorage.getItem("authToken");

export async function registration(order) {
  try {
    const response = await fetch(
      "https://todo-redev.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  } catch (error) {
    console.error("Registration error:", error);
  }
}

export async function login(emailPassword) {
  try {
    const response = await fetch(
      "https://todo-redev.herokuapp.com/api/auth/login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPassword),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function createTask(task) {
  try {
    const response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: task }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function getTasks() {
  try {
    const response = await fetch("https://todo-redev.herokuapp.com/api/todos", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function editTask(task, id) {
  try {
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: task }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function isCompleted(id) {
  try {
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}/isCompleted`,
      {
        method: "PATCH",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}

export async function deleteFetch(id) {
  try {
    const response = await fetch(
      `https://todo-redev.herokuapp.com/api/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
}