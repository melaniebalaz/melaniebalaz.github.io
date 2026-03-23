const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const workGroup = document.querySelector(".nav-work");
const workTrigger = workGroup?.querySelector(":scope > a");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    siteNav.classList.toggle("nav-visible");
  });
}

if (workGroup && workTrigger) {
  workTrigger.addEventListener("click", (event) => {
    if (window.innerWidth <= 1100) {
      event.preventDefault();
      workGroup.classList.toggle("nav-open");
      return;
    }

    if (!workGroup.classList.contains("nav-open")) {
      event.preventDefault();
      workGroup.classList.add("nav-open");
      return;
    }
  });

  document.addEventListener("click", (event) => {
    if (!workGroup.contains(event.target)) {
      workGroup.classList.remove("nav-open");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      workGroup.classList.remove("nav-open");
    }
  });

  workGroup.querySelectorAll(".dropdown-link").forEach((link) => {
    link.addEventListener("click", () => {
      workGroup.classList.remove("nav-open");
    });
  });
}

if (siteNav) {
  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 1100) {
        siteNav.classList.remove("nav-visible");
        navToggle?.setAttribute("aria-expanded", "false");
      }
    });
  });
}
