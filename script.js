const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    const taskItem = document.createElement("li");
    taskItem.innerText = taskText;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () => {
      taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);

    taskInput.value = "";
  }
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
  saveButton.addEventListener("click", handleEdit);
}

