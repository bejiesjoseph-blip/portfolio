/* ============================================================
   Bejies Joseph — Portfolio behaviour
   Header state · mobile nav · scroll reveal · active link ·
   contact form (mailto) · footer year
   ============================================================ */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const header = document.getElementById("site-header");
  const nav = document.getElementById("primary-nav");
  const navToggle = document.getElementById("nav-toggle");
  const toTop = document.querySelector(".to-top");
  const navLinks = Array.from(document.querySelectorAll('.nav-list a[href^="#"]'));

  /* ---------- Header + back-to-top state ---------- */
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 8);

    if (toTop) {
      toTop.classList.toggle("is-visible", y > 600);
    }

    updateActiveLink();
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(onScroll);
      }
    },
    { passive: true }
  );

  /* ---------- Active section highlighting ---------- */
  const sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function updateActiveLink() {
    const offset = (header ? header.offsetHeight : 0) + 90;
    const scrollPos = window.scrollY + offset;
    let current = null;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + current;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  /* ---------- Mobile navigation ---------- */
  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
  }

  function openNav() {
    if (!nav || !navToggle) return;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Close menu");
  }

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeNav() : openNav();
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  document.addEventListener("click", function (event) {
    if (!nav || !nav.classList.contains("is-open")) return;
    if (nav.contains(event.target) || navToggle.contains(event.target)) return;
    closeNav();
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 980) {
      closeNav();
    }
  });

  /* ---------- Scroll reveal ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  } else {
    revealItems.forEach(function (item) {
      const siblings = Array.from(item.parentElement.children).filter(function (child) {
        return child.classList.contains("reveal");
      });
      const index = siblings.indexOf(item);
      item.style.transitionDelay = Math.min(index, 4) * 70 + "ms";
    });

    const revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      revealObserver.observe(item);
    });
  }

  /* ---------- Contact form ---------- */
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const OWNER_EMAIL = "bejiesjoseph@gmail.com";

  function setStatus(message, isError) {
    if (!status) return;
    status.textContent = message;
    status.classList.toggle("is-error", Boolean(isError));
  }

  function markInvalid(field, invalid) {
    field.setAttribute("aria-invalid", invalid ? "true" : "false");
  }

  if (form) {
    const nameField = form.elements.name;
    const emailField = form.elements.email;
    const messageField = form.elements.message;

    [nameField, emailField, messageField].forEach(function (field) {
      field.addEventListener("input", function () {
        markInvalid(field, false);
        setStatus("", false);
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const name = nameField.value.trim();
      const email = emailField.value.trim();
      const message = messageField.value.trim();
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

      markInvalid(nameField, name === "");
      markInvalid(emailField, !emailOk);
      markInvalid(messageField, message === "");

      if (name === "" || !emailOk || message === "") {
        setStatus("Please fill in every field with a valid email address.", true);
        const firstInvalid = !name ? nameField : !emailOk ? emailField : messageField;
        firstInvalid.focus();
        return;
      }

      const subject = "Portfolio enquiry from " + name;
      const body = message + "\n\n—\n" + name + "\n" + email;
      const mailto =
        "mailto:" +
        OWNER_EMAIL +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);

      setStatus("Opening your email app — press send there and I'll reply soon.", false);
      window.location.href = mailto;

      window.setTimeout(function () {
        form.reset();
      }, 600);
    });
  }

  /* ---------- Footer year ---------- */
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = String(new Date().getFullYear());
  }

  /* ---------- Initial paint ---------- */
  onScroll();
})();
