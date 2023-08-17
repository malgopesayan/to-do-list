const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const noTaskMessage = document.getElementById("noTaskMessage");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
      <span class="task-text">${taskText}</span>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(taskItem);
    noTaskMessage.style.display = "none";

    taskInput.value = "";
    attachTaskButtonsEventListeners(taskItem);
  }
}

function attachTaskButtonsEventListeners(taskItem) {
  const editButton = taskItem.querySelector(".edit-btn");
  const deleteButton = taskItem.querySelector(".delete-btn");

  editButton.addEventListener("click", () => {
    editTask(taskItem, editButton);
  });

  deleteButton.addEventListener("click", () => {
    taskItem.remove();
    checkNoTasks();
  });
}

function editTask(taskItem, editButton) {
  const taskText = taskItem.querySelector(".task-text");
  const originalText = taskText.textContent;
  const editInput = document.createElement("input");
  editInput.value = originalText;
  taskItem.replaceChild(editInput, taskText);

  editButton.textContent = "Save";
  editButton.classList.remove("edit-btn");
  editButton.classList.add("save-btn");

  editButton.removeEventListener("click", handleEdit);
  editButton.addEventListener("click", function() {
    saveTask(taskItem, editInput, editButton);
  });
}

function saveTask(taskItem, editInput, saveButton) {
  const editedText = editInput.value.trim();
  const taskText = document.createElement("span");
  taskText.textContent = editedText;

  taskItem.replaceChild(taskText, editInput);

  saveButton.textContent = "Edit";
  saveButton.classList.remove("save-btn");
  saveButton.classList.add("edit-btn");

  saveButton.removeEventListener("click", saveTask);
  saveButton.addEventListener("click", function() {
    editTask(taskItem, saveButton);
  });
}

function checkNoTasks() {
  if (taskList.children.length === 0) {
    noTaskMessage.style.display = "block";
  }
}
