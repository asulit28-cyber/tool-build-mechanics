const STORAGE_KEY = "everydayToolTasks";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const storageMessage = document.getElementById("storageMessage");
const clearCompletedBtn = document.getElementById("clearCompletedBtn");

let storageAvailable = true;
let tasks = loadTasks();

function loadTasks() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    storageAvailable = false;
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    storageAvailable = true;
    storageMessage.hidden = true;
  } catch (error) {
    storageAvailable = false;
    storageMessage.hidden = false;
  }
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days}d ${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function getTaskDuration(task) {
  return (task.completedAt || Date.now()) - task.createdAt;
}

function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = "task";
  article.dataset.id = task.id;

  if (task.completedAt) article.classList.add("completed");

  const info = document.createElement("div");
  info.className = "task-info";

  const name = document.createElement("p");
  name.className = "task-name";
  name.textContent = task.text;

  const time = document.createElement("p");
  time.className = "task-time";
  time.textContent = task.completedAt
    ? `completed after ${formatDuration(getTaskDuration(task))}`
    : `waiting ${formatDuration(getTaskDuration(task))}`;

  info.append(name, time);
  article.appendChild(info);

  if (!task.completedAt) {
    const button = document.createElement("button");
    button.className = "complete-button";
    button.type = "button";
    button.textContent = "Complete";
    button.addEventListener("click", () => completeTask(task.id));
    article.appendChild(button);
  }

  return article;
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.hidden = false;
    clearCompletedBtn.hidden = true;
    return;
  }

  emptyMessage.hidden = true;
  
  // Show "Clear Completed" button only if at least one task is finished
  const hasCompleted = tasks.some(task => task.completedAt !== null);
  clearCompletedBtn.hidden = !hasCompleted;

  tasks.forEach(task => taskList.appendChild(createTaskElement(task)));
}

function updateTimers() {
  document.querySelectorAll(".task").forEach(element => {
    const task = tasks.find(item => item.id === element.dataset.id);
    if (!task) return;

    const timeElement = element.querySelector(".task-time");
    timeElement.textContent = task.completedAt
      ? `completed after ${formatDuration(getTaskDuration(task))}`
      : `waiting ${formatDuration(getTaskDuration(task))}`;
  });
}

function addTask(text) {
  tasks.unshift({
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
    completedAt: null
  });

  saveTasks();
  renderTasks();
}

function completeTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task || task.completedAt) return;

  task.completedAt = Date.now();
  saveTasks();
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completedAt);
  saveTasks();
  renderTasks();
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();

  const text = taskInput.value.trim();
  if (!text) return;

  addTask(text);
  taskInput.value = "";
  taskInput.focus();
});

clearCompletedBtn.addEventListener("click", clearCompleted);

if (!storageAvailable) storageMessage.hidden = false;

renderTasks();
setInterval(updateTimers, 1000);