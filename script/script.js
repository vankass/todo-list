const select = document.querySelector('.todo__select');
const arrow = document.querySelector('.todo__select-check');

select.addEventListener('click', () => {
  arrow.classList.toggle('open');
});

select.addEventListener('blur', () => {
  arrow.classList.remove('open');
});