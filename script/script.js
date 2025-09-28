const modal = document.querySelector('[data-js-modal]');
const modalForm = document.querySelector('[data-js-modal-form]');
const modalInput = document.querySelector('[data-js-modal-input]');

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const template = document.querySelector('[data-js-todo-template]');
const list = document.querySelector('[data-js-todo-list]');

modalForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const taskText = modalInput.value.trim();
  addTask(taskText);
});

function addTask(text) {
  if (!text) return;

  const task = {
    id: Date.now().toString(),
    text: text,
    done: false
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks))

  const node = template.content.firstElementChild.cloneNode(true);
  node.dataset.taskId = task.id;
  node.querySelector('[data-js-todo-item-span]').textContent = task.text;
  list.appendChild(node);

  modalInput.value = '';
}