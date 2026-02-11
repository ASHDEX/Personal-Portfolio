document.addEventListener("DOMContentLoaded", () => {
  // Dropdowns
  document.querySelectorAll(".nav-item .nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.stopPropagation();
      const parent = link.closest(".nav-item");

      document.querySelectorAll(".nav-item").forEach(i => {
        if (i !== parent) i.classList.remove("open");
      });

      parent.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("open"));
  });

  // Mobile hamburger
  const hamburger = document.querySelector(".hamburger");
  const menu = document.getElementById("menu");
  if (hamburger && menu) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.toggle("open");
    });
  }
});
