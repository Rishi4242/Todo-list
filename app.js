const taskInput = document.querySelector("input");
const addBtn = document.querySelector(".addBtn");
const taskContainer = document.querySelector(".task-container");

const allTasks = [];

const addTask = () => {
  if (taskInput.value.trim() !== "") {
    allTasks[allTasks.length] = taskInput.value;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    taskInput.value = "";
  } else {
    alert("Please write a valid Task");
  }
  renderTask();
};

const listenEvent = () => {
  addBtn.addEventListener("click", () => {
    addTask();
  });
  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  });
};

const renderTask = () => {
  taskContainer.innerHTML = ""; // Clear existing tasks

  allTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.setAttribute("class", "task");
    li.innerText = task;
    const div = document.createElement("div");
    div.setAttribute("class", "btns");

    const btn = document.createElement("button");
    btn.innerText = "Delete";

    // Add delete functionality
    btn.addEventListener("click", () => {
      allTasks.splice(index, 1); // Remove from array
      localStorage.setItem("tasks", JSON.stringify(allTasks));
      renderTask(); // Re-render
    });

    div.append(btn);
    li.append(div);
    taskContainer.append(li);
  });
};

const loadTasks = () => {
  let stored = JSON.parse(localStorage.getItem("tasks")) || [];
  if (stored.length) {
    allTasks.push(...stored);
    renderTask();
  }
};

loadTasks();
listenEvent();