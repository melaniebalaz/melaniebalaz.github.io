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

document.querySelectorAll(".couple-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const section = toggle.closest(".couple-section");
    const gallery = section?.querySelector(".couple-gallery");

    if (!section || !gallery) {
      return;
    }

    const isOpen = section.classList.contains("is-open");

    document.querySelectorAll(".couple-section").forEach((item) => {
      item.classList.remove("is-open");
      const itemToggle = item.querySelector(".couple-toggle");
      itemToggle?.setAttribute("aria-expanded", "false");
    });

    if (!isOpen) {
      section.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

const closeLightbox = (lightbox, image) => {
  lightbox.hidden = true;
  image.src = "";
  image.alt = "";
  document.body.style.overflow = "";
};

document.querySelectorAll(".lightbox").forEach((lightbox) => {
  const lightboxImage = lightbox.querySelector(".lightbox-image");
  const lightboxClose = lightbox.querySelector(".lightbox-close");

  if (!lightboxImage) {
    return;
  }

  document.querySelectorAll(".lightbox-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const image = trigger.querySelector("img");
      if (!image) {
        return;
      }

      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      document.body.style.overflow = "hidden";
    });
  });

  lightboxClose?.addEventListener("click", () => closeLightbox(lightbox, lightboxImage));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox(lightbox, lightboxImage);
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".lightbox").forEach((lightbox) => {
      const image = lightbox.querySelector(".lightbox-image");
      if (!lightbox.hidden && image) {
        closeLightbox(lightbox, image);
      }
    });
  }
});
