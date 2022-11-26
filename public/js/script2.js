const categoryBasah = document.getElementById("category-basah");
const categoryKering = document.getElementById("category-kering");

categoryBasah.addEventListener("click", (e) => {
  e.preventDefault();
  categoryBasah.classList.toggle("category-active");
});

categoryKering.addEventListener("click", (e) => {
  e.preventDefault();
  categoryKering.classList.toggle("category-active");
});
