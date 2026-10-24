window.SITE_CONFIG = {
  messengerUrl: "https://m.me/balayageloungebymarlonropan"
};

const setMessengerLinks = () => {
  document.querySelectorAll("[data-messenger-link]").forEach((link) => {
    link.href = window.SITE_CONFIG.messengerUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
  });
};

const setCurrentYear = () => {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
};

const initMobileMenu = () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });

  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target) && !toggle.contains(event.target)) closeMenu();
  });
};

const initLightbox = () => {
  const lightbox = document.querySelector(".lightbox");
  const image = document.querySelector(".lightbox-image");
  const closeButton = document.querySelector(".lightbox-close");
  const items = [...document.querySelectorAll(".gallery-item")];
  if (!lightbox || !image || !closeButton || !items.length) return;

  let lastFocusedItem = null;

  const closeLightbox = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    image.removeAttribute("src");
    lastFocusedItem?.focus();
  };

  const openLightbox = (item) => {
    const source = item.dataset.full || item.querySelector("img")?.src;
    const thumbnail = item.querySelector("img");
    if (!source || !thumbnail) return;
    lastFocusedItem = item;
    image.src = source;
    image.alt = thumbnail.alt || "Expanded salon hairstyle";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    closeButton.focus();
  };

  items.forEach((item) => {
    item.addEventListener("click", () => openLightbox(item));
    item.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openLightbox(item);
      }
    });
  });

  closeButton.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });
};

setMessengerLinks();
setCurrentYear();
initMobileMenu();
initLightbox();
