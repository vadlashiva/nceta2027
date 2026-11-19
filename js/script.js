/* NCETA-2027 site script: theme, accessibility, countdown, animations, lightbox, forms. */
(function () {
  "use strict";

  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* storage unavailable */ } }
  };

  // ---- dark mode (saved per visitor; follows the system setting until chosen)
  var root = document.documentElement;
  function applyTheme(t) {
    root.setAttribute("data-theme", t);
    document.querySelectorAll(".theme-toggle i").forEach(function (i) {
      i.className = t === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.setAttribute("aria-label", t === "dark" ? "Switch to light mode" : "Switch to dark mode");
      b.setAttribute("aria-pressed", t === "dark" ? "true" : "false");
    });
  }
  var saved = store.get("nceta-theme");
  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  // ---- larger text
  function applyText(on) {
    document.body.classList.toggle("large-text", on);
    document.querySelectorAll(".text-toggle").forEach(function (b) { b.setAttribute("aria-pressed", on ? "true" : "false"); });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyTheme(root.getAttribute("data-theme"));
    applyText(store.get("nceta-large") === "1");

    document.querySelectorAll(".theme-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var t = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(t); store.set("nceta-theme", t);
      });
    });
    document.querySelectorAll(".text-toggle").forEach(function (b) {
      b.addEventListener("click", function () {
        var on = !document.body.classList.contains("large-text");
        applyText(on); store.set("nceta-large", on ? "1" : "0");
      });
    });

    // ---- active navigation link
    var page = location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".navbar-nceta .nav-link").forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href === page) { a.classList.add("active"); a.setAttribute("aria-current", "page"); }
    });
    // close the mobile menu after choosing a link
    document.querySelectorAll(".navbar-nceta .nav-link").forEach(function (a) {
      a.addEventListener("click", function () {
        var menu = document.getElementById("mainNav");
        if (menu && menu.classList.contains("show") && window.bootstrap) {
          window.bootstrap.Collapse.getOrCreateInstance(menu).hide();
        }
      });
    });

    // ---- countdown to the opening session (7 Jan 2027, 09:00 IST)
    var cd = document.getElementById("countdown");
    if (cd) {
      var target = new Date("2027-01-07T09:00:00+05:30").getTime();
      var els = {
        d: cd.querySelector("[data-cd=d]"), h: cd.querySelector("[data-cd=h]"),
        m: cd.querySelector("[data-cd=m]"), s: cd.querySelector("[data-cd=s]")
      };
      var tick = function () {
        var diff = target - Date.now();
        if (diff <= 0) {
          cd.innerHTML = '<p class="fs-4 fw-bold mb-0">The conference is under way. Welcome to NCETA-2027!</p>';
          clearInterval(timer); return;
        }
        var d = Math.floor(diff / 864e5), h = Math.floor(diff % 864e5 / 36e5),
            m = Math.floor(diff % 36e5 / 6e4), s = Math.floor(diff % 6e4 / 1e3);
        els.d.textContent = d; els.h.textContent = String(h).padStart(2, "0");
        els.m.textContent = String(m).padStart(2, "0"); els.s.textContent = String(s).padStart(2, "0");
      };
      var timer = setInterval(tick, 1000); tick();
    }

    // ---- animations and lightbox (libraries load from CDNs; the page still works without them)
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, offset: 60,
        disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches });
    } else {
      document.documentElement.classList.add("no-aos");
    }
    if (window.GLightbox) { window.GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true }); }

    // ---- back to top
    var btt = document.querySelector(".back-to-top");
    if (btt) {
      window.addEventListener("scroll", function () { btt.classList.toggle("show", window.scrollY > 500); }, { passive: true });
      btt.addEventListener("click", function () { window.scrollTo({ top: 0 }); document.getElementById("main").focus(); });
    }

    // ---- contact form: no backend, so it opens the visitor's e-mail app with the message filled in
    var form = document.getElementById("contactForm");
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) { form.classList.add("was-validated"); return; }
        var f = new FormData(form);
        var body = "Name: " + f.get("name") + "\nEmail: " + f.get("email") + "\nPhone: " + (f.get("phone") || "-") +
                   "\n\n" + f.get("message");
        location.href = "mailto:" + form.dataset.to + "?subject=" + encodeURIComponent("[NCETA-2027] " + f.get("subject")) +
                        "&body=" + encodeURIComponent(body);
        var st = document.getElementById("formStatus");
        if (st) { st.textContent = "Your e-mail app should open with the message ready to send."; }
      });
    }

    // ---- copy UPI ID
    document.querySelectorAll("[data-copy]").forEach(function (b) {
      b.addEventListener("click", function () {
        var txt = b.getAttribute("data-copy");
        if (navigator.clipboard) {
          navigator.clipboard.writeText(txt).then(function () {
            var old = b.innerHTML; b.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
            setTimeout(function () { b.innerHTML = old; }, 1800);
          });
        }
      });
    });

    var yr = document.getElementById("year");
    if (yr) { yr.textContent = new Date().getFullYear(); }
  });
})();
