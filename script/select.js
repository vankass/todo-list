const select = document.querySelector("[data-js-todo-select]");
const arrow = document.querySelector("[data-js-todo-select-check]");

select.addEventListener("click", () => {
  arrow.classList.toggle("open");
});

select.addEventListener("blur", () => {
  arrow.classList.remove("open");
});
