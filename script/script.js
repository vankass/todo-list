const modal = document.querySelector("[data-js-modal]");
const modalForm = document.querySelector("[data-js-modal-form]");
const modalInput = document.querySelector("[data-js-modal-input]");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const template = document.querySelector("[data-js-todo-template]");
const list = document.querySelector("[data-js-todo-list]");
const emptyMessage = document.querySelector("[data-js-todo-empty-message]");

const searchInput = document.querySelector("[data-js-todo-search-input]");
const select = document.querySelector("[data-js-todo-select]");
select.value = "all";

renderTasks(tasks);

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const taskText = modalInput.value.trim();
  addTask(taskText);
});

list.addEventListener("click", (e) => {
  const deleteButton = e.target.closest("[data-js-todo-delete-button]");
  const checkbox = e.target.closest("[data-js-todo-item-checkbox]");
  const li = e.target.closest("li");

  if (!li) return;
  const id = Number(li.dataset.taskId);

  if (deleteButton) {
    li.remove();
    const newTasks = tasks.filter((task) => task.id !== id);
    tasks.length = 0;
    tasks.push(...newTasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else if (checkbox) {
    const task = tasks.find((task) => task.id === id);
    task.done = checkbox.checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  renderTasks(filteredTask);
});

select.addEventListener("change", () => {
  const filter = select.value;
  let filteredTask = tasks;

  if (filter === "all") {
    filteredTask = tasks;
  } else if (filter === "complete") {
    filteredTask = tasks.filter((task) => task.done);
  } else if (filter === "incomplete") {
    filteredTask = tasks.filter((task) => !task.done);
  }

  renderTasks(filteredTask);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  list.querySelectorAll("li").forEach(li => {
    const text = li.querySelector("[data-js-todo-item-span]").textContent.toLowerCase();

    if (text.includes(query)) {
      li.style.display = "flex";
    } else {
      li.style.display = "none";
    }
  });
});

function renderTasks(filteredTask) {
  list.innerHTML = "";

  if (filteredTask.length === 0) {
    emptyMessage.style.display = "flex";
  } else {
    emptyMessage.style.display = "none";
    filteredTask.forEach((task) => {
      const node = template.content.firstElementChild.cloneNode(true);

      const checkbox = node.querySelector("[data-js-todo-item-checkbox]");
      const label = node.querySelector("[data-js-todo-item-label]");

      const uniqueId = `todo-${task.id}`;
      checkbox.id = uniqueId;
      label.setAttribute("for", uniqueId);

      node.dataset.taskId = task.id;
      node.querySelector("[data-js-todo-item-span]").textContent = task.text;
      checkbox.checked = !!task.done;

      list.appendChild(node);
    });
  }
}

function addTask(text) {
  if (!text) return;

  const task = {
    id: Date.now(),
    text: text,
    done: false,
  };

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks(tasks);
  modalInput.value = "";
}
