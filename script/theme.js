const html = document.documentElement;
const themeButton = document.querySelector("[data-js-todo-theme-button]");
const logo = document.querySelector("[data-js-todo-theme-img]");
const empty = document.querySelector("[data-js-todo-empty-img]");

themeButton.addEventListener("click", () => {
  const isDark = html.classList.toggle("dark");
  logo.src = isDark ? "img/sun.svg" : "img/moon.svg";
  empty.src = isDark ? "img/detective-dark.svg" : "img/detective-light.svg";
});
