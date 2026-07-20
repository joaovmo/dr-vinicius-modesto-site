(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const nav = document.querySelector("[data-nav]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const waFloat = document.querySelector("[data-wa-float]");
  const navLinks = Array.from(document.querySelectorAll(".nav__link"));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const THEME_KEY = "vm-theme";
  const root = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#0d201f" : "#2c5f5d");
    themeToggle.setAttribute(
      "aria-label",
      theme === "dark" ? "Ativar tema claro" : "Ativar tema escuro"
    );
  };

  const storedTheme = (() => {
    try {
      return localStorage.getItem(THEME_KEY);
    } catch (e) {
      return null;
    }
  })();

  applyTheme(storedTheme || (darkQuery.matches ? "dark" : "light"));

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {
      void e;
    }
  });

  darkQuery.addEventListener("change", (event) => {
    let saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      saved = null;
    }
    if (!saved) applyTheme(event.matches ? "dark" : "light");
  });

  const setHeaderState = () => {
    const scrolled = window.scrollY > 12;
    header.classList.toggle("is-stuck", scrolled);
    if (waFloat) waFloat.classList.toggle("is-visible", window.scrollY > 600);
  };

  const closeNav = () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const toggleNav = () => {
    const open = navToggle.getAttribute("aria-expanded") === "true";
    nav.classList.toggle("is-open", !open);
    navToggle.setAttribute("aria-expanded", String(!open));
  };

  navToggle.addEventListener("click", toggleNav);

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeNav();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav();
  });

  const desktopQuery = window.matchMedia("(min-width: 881px)");
  desktopQuery.addEventListener("change", closeNav);

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        setHeaderState();
        ticking = false;
      });
    },
    { passive: true }
  );
  setHeaderState();

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) =>
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${entry.target.id}`
            )
          );
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();
