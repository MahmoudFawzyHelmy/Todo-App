let taskInput = document.getElementById("task-input");
let btn = document.getElementById("btn");
let tasksData = document.getElementById("tasks");
let loading = document.getElementById("loading");
let alert = document.getElementById("alert");
let todoTilte = document.getElementById("todo-title");

btn.addEventListener("click", function () {
  let taskData = {
    title: taskInput.value,
    apiKey: "668bc03560a208ee1fdc3b68",
  };
  if (taskInput.value) {
    alert.style.display = "none";
    addTodo(taskData);
  } else {
    alert.style.display = "block";
  }
});

async function addTodo(taskInput) {
  let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method: "post",
    body: JSON.stringify(taskInput),
    headers: { "content-type": "application/json" },
  });

  let result = await data.json();
  if (result.message == "success") {
    getAllTodos();
  } else {
    alert.style.display = "block";
  }
  console.log(result);
}

async function getAllTodos() {
  alert.style.display = "none";
  loading.style.display = "block";
  tasksData.style.display = "none";
  let data = await fetch(
    "https://todos.routemisr.com/api/v1/todos/668bc03560a208ee1fdc3b68"
  );
  let result = await data.json();

  if (result.message == "success") {
    tasksData.style.display = "block";
    loading.style.display = "none";
    todoTilte.innerHTML = "no tasks";

    displayTodos(result.todos);
  }
}
getAllTodos();

function displayTodos(data) {
  let todoData = "";
  for (let i = 0; i < data.length; i++) {
    if (data.length != 0) {
      todoTilte.innerHTML = "all tasks";
      todoData += `
               <div class="task d-flex justify-content-between align-items-center w-75 m-auto shadow p-2 my-3 rounded-4 ${
                 data[i].completed ? " bg-danger" : ""
               }">
                <p class="task-text m-0 p-0 ${
                  data[i].completed ? "text-decoration-line-through" : ""
                } ">${data[i].title}</p>
                <div class="icons d-flex align-items-center justify-content-center">
                    <i class="fa-regular fa-circle-check ${
                      data[i].completed ? "d-none" : ""
                    } " onclick="todoAction('${data[i]._id}','put' )"></i>
                    <i class=" fa-solid fa-trash" onclick="todoAction('${
                      data[i]._id
                    }','delete')"></i>
                </div>

            </div>
        `;
    } else {
      todoTilte.innerHTML = "no tasks";
    }
  }
  tasksData.innerHTML = todoData;
}

async function todoAction(id, method) {
  let data = await fetch("https://todos.routemisr.com/api/v1/todos", {
    method,
    body: JSON.stringify({ todoId: id }),
    headers: {
      "content-type": "application/json",
    },
  });
  let result = await data.json();
  if (result.message == "success") {
    loading.style.display = "block";
    tasksData.style.display = "none";
    getAllTodos();
  }
}
