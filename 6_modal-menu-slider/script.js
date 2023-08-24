const toggle = document.getElementById("toggle");
const open = document.getElementById("open");
const modal = document.getElementById("modal");
const close = document.getElementById("close");

// Toggle nav
toggle.addEventListener("click", (eo) => {
  eo.target.classList.toggle("active");
  document.body.classList.toggle("show-nav");
});

// Show Modal
open.addEventListener("click", () => {
  modal.classList.add("active");
});

// Hide Modal
close.addEventListener("click", () => {
  modal.classList.remove("active");
});

// Hide modal on outside click
window.addEventListener("click", (eo) => {
  eo.target == modal ? modal.classList.remove("active") : false;
});
