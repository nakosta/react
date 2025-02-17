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

// "id": 723,
// "username": "nakosta666",
// "email": "nakosta666@mail.ru",
// "password": "Qwerty12345$",
// "gender": "male",
// "age": 27

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ha29zdGE2NjZAbWFpbC5ydSIsImlkIjo3MjMsImlhdCI6MTcxNzEzMTA4MX0.kly-kubaJsGpD6-rfWob5SMZiBGUx9IjCdqVa5bi1Mc"

//   "id": 540,
//   "username": "nakosta666",
//   "email": "nakosta666@mail.ru",
//   "password": "Qwerty12345$",
//   "gender": "male",
//   "age": 27

// "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im5ha29zdGE2NjZAbWFpbC5ydSIsImlkIjo1NDAsImlhdCI6MTczOTc3NzI3Nn0.ePnhZ6tFIE5QC0NF9KLDRLaD7BxuBg5tPPXjNsK-c1g"

// async function main() {
//   // зарегистрировать пользователя
//   await registration(order);

//   // авторизоваться
//   const { token } = await login(emailPassword);

//   // // создать таску
//   const { id } = await createTask("Купить рыбу", token);

//   // // список всех тасок
//   const tasks = await getTasks(token);

//   // // изменить таску
//   await editTask("Купить мясо", id, token);

//   // // удалить таску
//   await deleteTask(id, token);
// }

// main();
