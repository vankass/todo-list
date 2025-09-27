const addButton = document.querySelector('[data-js-todo-add-button]');
const applyButton = document.querySelector('[data-js-modal-apply-button]');
const cancelButton = document.querySelector('[data-js-modal-cancel-button]');
const modal = document.querySelector('[data-js-modal]');

addButton.addEventListener('click', () => {
  modal.classList.add('visible');
});

applyButton.addEventListener('click', () => {
  modal.classList.remove('visible');
});

cancelButton.addEventListener('click', () => {
  modal.classList.remove('visible');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('visible');
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modal.classList.remove('visible');
});