let dropdown = document.querySelector("[data-dropdown]");
let dropdownContent = document.querySelector("[data-dropdown-content]");
if (window.matchMedia("(hover: none)")) {
  dropdown.addEventListener("click", () => {
    dropdownContent.classList.toggle("dropdown__content--active");
  })
  let links = dropdownContent.querySelectorAll("a");
  links.forEach(link => link.addEventListener("click", () => {
    dropdownContent.classList.remove("dropdown__content--active");
  }))
  document.addEventListener("click", e => {
    if (!e.target.closest("[data-dropdown]") && !e.target.closest("[data-dropdown-content]")) {
      dropdownContent.classList.remove("dropdown__content--active");
    }
  })
}
