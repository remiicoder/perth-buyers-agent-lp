/* =====================================================================
   Niche Buyers Agents — Landing Page Scripts
   - Sticky header shadow on scroll
   - Mobile nav toggle
   - Reviews slider (snap-scroll + prev/next + dots)
   - Reveal-on-scroll animations
   - FAQ: only one open at a time (accordion behaviour)
===================================================================== */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  /* ------------------ Sticky header ------------------ */
  const header = $("#siteHeader");
  if (header) {
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------ Mobile navigation ------------------ */
  const navToggle = $(".nav-toggle");
  const mobileNav = $("#mobileNav");

  if (navToggle && mobileNav) {
    const closeMenu = () => {
      navToggle.setAttribute("aria-expanded", "false");
      mobileNav.classList.remove("is-open");
      mobileNav.setAttribute("aria-hidden", "true");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("is-open", !isOpen);
      mobileNav.setAttribute("aria-hidden", String(isOpen));
    });

    $$("a", mobileNav).forEach((a) => a.addEventListener("click", closeMenu));

    window.addEventListener("resize", () => {
      if (window.innerWidth > 980) closeMenu();
    });
  }

  /* ------------------ Reviews slider ------------------ */
  const slider = $("#reviewsSlider");
  if (slider) {
    const track = $("#sliderTrack", slider);
    const prev = $("#sliderPrev", slider);
    const next = $("#sliderNext", slider);
    const dotsWrap = $("#sliderDots", slider);
    const slides = $$(".review", track);

    slides.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "slider__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Go to review ${i + 1}`);
      dot.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = $$(".slider__dot", dotsWrap);

    const getActiveIndex = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      slides.forEach((s, i) => {
        const c = s.offsetLeft + s.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) {
          bestDist = d;
          bestIdx = i;
        }
      });
      return bestIdx;
    };

    const updateDots = () => {
      const i = getActiveIndex();
      dots.forEach((d, idx) => d.classList.toggle("is-active", idx === i));
    };

    const goTo = (i) => {
      const idx = (i + slides.length) % slides.length;
      const target = slides[idx];
      const left = target.offsetLeft - (track.clientWidth - target.offsetWidth) / 2;
      track.scrollTo({ left, behavior: "smooth" });
    };

    prev.addEventListener("click", () => goTo(getActiveIndex() - 1));
    next.addEventListener("click", () => goTo(getActiveIndex() + 1));

    let scrollTimer;
    track.addEventListener(
      "scroll",
      () => {
        window.clearTimeout(scrollTimer);
        scrollTimer = window.setTimeout(updateDots, 80);
      },
      { passive: true }
    );

    updateDots();

    /* Auto-advance, pause on hover/focus */
    let auto = window.setInterval(() => goTo(getActiveIndex() + 1), 7000);
    const stopAuto = () => {
      window.clearInterval(auto);
      auto = null;
    };
    const startAuto = () => {
      if (!auto) auto = window.setInterval(() => goTo(getActiveIndex() + 1), 7000);
    };
    slider.addEventListener("mouseenter", stopAuto);
    slider.addEventListener("mouseleave", startAuto);
    slider.addEventListener("focusin", stopAuto);
    slider.addEventListener("focusout", startAuto);

    /* Keyboard support */
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(getActiveIndex() - 1);
      if (e.key === "ArrowRight") goTo(getActiveIndex() + 1);
    });
  }

  /* ------------------ FAQ accordion behaviour ------------------ */
  const faqItems = $$(".faq__item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((other) => {
          if (other !== item) other.open = false;
        });
      }
    });
  });

  /* ------------------ Reveal on scroll ------------------ */
  const revealTargets = [
    ".section-header",
    ".pain__copy",
    ".pain__visual",
    ".step",
    ".area-card",
    ".avatar",
    ".why__media",
    ".why__copy",
    ".review",
    ".faq__item",
    ".final__inner > *"
  ];
  const reveals = $$(revealTargets.join(","));
  reveals.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }

  /* ------------------ Smooth anchor scroll offset ------------------ */
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const headerH = header ? header.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
})();
