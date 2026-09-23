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

function createTaskElement(task) {
  const article = document.createElement("article");
  article.className = "task";
  article.dataset.id = task.id;

  const now = Date.now();
  const isStarted = task.startedAt !== null;
  const isCompleted = task.completedAt !== null;

  if (isCompleted) article.classList.add("completed");

  const info = document.createElement("div");
  info.className = "task-info";

  const name = document.createElement("p");
  name.className = "task-name";
  name.textContent = task.text;

  const time = document.createElement("div");
  time.className = "task-time";

  info.append(name, time);
  article.appendChild(info);

  const controls = document.createElement("div");
  controls.className = "task-controls";

  // State 1: Not started yet
  if (!isStarted && !isCompleted) {
    const startBtn = document.createElement("button");
    startBtn.className = "action-button start-button";
    startBtn.type = "button";
    startBtn.textContent = "Start";
    startBtn.addEventListener("click", () => startTask(task.id));
    controls.appendChild(startBtn);
  }

  // State 2: In progress
  if (isStarted && !isCompleted) {
    const completeBtn = document.createElement("button");
    completeBtn.className = "action-button complete-button";
    completeBtn.type = "button";
    completeBtn.textContent = "Complete";
    completeBtn.addEventListener("click", () => completeTask(task.id));
    controls.appendChild(completeBtn);
  }

  // Individual delete button for every task
  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-button";
  deleteBtn.type = "button";
  deleteBtn.setAttribute("aria-label", "Delete task");
  deleteBtn.innerHTML = "&times;";
  deleteBtn.addEventListener("click", () => deleteTask(task.id));
  controls.appendChild(deleteBtn);

  article.appendChild(controls);
  return article;
}

function updateTaskTimeDisplay(element, task) {
  const timeElement = element.querySelector(".task-time");
  const now = Date.now();

  const isStarted = task.startedAt !== null;
  const isCompleted = task.completedAt !== null;

  if (isCompleted) {
    const waitingDuration = task.startedAt - task.createdAt;
    const workDuration = task.completedAt - task.startedAt;
    const totalDuration = task.completedAt - task.createdAt;

    timeElement.innerHTML = `
      <span>Sat waiting: <strong>${formatDuration(waitingDuration)}</strong></span> &bull; 
      <span>Work time: <strong>${formatDuration(workDuration)}</strong></span> &bull; 
      <span>Total: <strong>${formatDuration(totalDuration)}</strong></span>
    `;
  } else if (isStarted) {
    const workDuration = now - task.startedAt;
    const waitingDuration = task.startedAt - task.createdAt;

    timeElement.innerHTML = `
      <span class="active-work">Working: <strong>${formatDuration(workDuration)}</strong></span> 
      <span class="sub-time">(Waited ${formatDuration(waitingDuration)})</span>
    `;
  } else {
    const waitingDuration = now - task.createdAt;
    timeElement.innerHTML = `<span>Waiting: <strong>${formatDuration(waitingDuration)}</strong></span>`;
  }
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.hidden = false;
    clearCompletedBtn.hidden = true;
    return;
  }

  emptyMessage.hidden = true;
  
  const hasCompleted = tasks.some(task => task.completedAt !== null);
  clearCompletedBtn.hidden = !hasCompleted;

  tasks.forEach(task => {
    const el = createTaskElement(task);
    updateTaskTimeDisplay(el, task);
    taskList.appendChild(el);
  });
}

function updateTimers() {
  document.querySelectorAll(".task").forEach(element => {
    const task = tasks.find(item => item.id === element.dataset.id);
    if (!task) return;
    updateTaskTimeDisplay(element, task);
  });
}

function addTask(text) {
  tasks.unshift({
    id: crypto.randomUUID(),
    text: text.trim(),
    createdAt: Date.now(),
    startedAt: null,
    completedAt: null
  });

  saveTasks();
  renderTasks();
}

function startTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task || task.startedAt) return;

  task.startedAt = Date.now();
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

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
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