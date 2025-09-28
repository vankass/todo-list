const modal = document.querySelector("[data-js-modal]");
const modalForm = document.querySelector("[data-js-modal-form]");
const modalInput = document.querySelector("[data-js-modal-input]");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const template = document.querySelector("[data-js-todo-template]");
const list = document.querySelector("[data-js-todo-list]");
const emptyMessage = document.querySelector("[data-js-todo-empty-message]");

renderTasks();

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = modalInput.value.trim();
  addTask(taskText);
});

function renderTasks() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    emptyMessage.style.display = "flex";
  } else {
    emptyMessage.style.display = "none";
    tasks.forEach((task) => {
      const node = template.content.firstElementChild.cloneNode(true);
      node.dataset.taskId = task.id;
      node.querySelector("[data-js-todo-item-span]").textContent = task.text;
      list.appendChild(node);
    });
  }
}

function addTask(text) {
  if (!text) return;

  const task = {
    id: Date.now().toString(),
    text: text,
    done: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
  modalInput.value = "";
}
