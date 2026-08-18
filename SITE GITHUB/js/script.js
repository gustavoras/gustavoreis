/* =========================================================
   Gustavo Reis — Portfólio
   Edite SOMENTE o objeto CONFIG abaixo.
   ========================================================= */
const CONFIG = {
  github: "https://github.com/gustavoras",
  linkedin: "https://www.linkedin.com/in/gustavoras",
  email: "gustavokngsilva@gmail.com",
};

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function applyConfig() {
  $$("[data-social]").forEach((el) => {
    const key = el.dataset.social;
    if (key === "email") {
      el.href = `mailto:${CONFIG.email}`;
      if (el.tagName !== "A" || el.children.length) {
        const p = el.querySelector("p");
        if (p) p.textContent = CONFIG.email;
      } else if (!el.querySelector("svg")) {
        el.textContent = CONFIG.email;
      }
    } else if (CONFIG[key]) {
      el.href = CONFIG[key];
    }
  });
}

/* ---------- nav ---------- */
function initNav() {
  const nav = $("#nav");
  const toggle = $("#menuToggle");
  let lastY = 0;

  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  $$(".nav-links a").forEach((a) =>
    a.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );

  const sections = $$("main section[id]");
  const links = $$(".nav-links a");

  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 12);
    nav.classList.toggle("hide", y > lastY && y > 140 && !nav.classList.contains("open"));
    lastY = y;

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (y / max) * 100 : 0;
    const bar = $("#progress");
    if (bar) bar.style.width = `${pct}%`;

    let current = sections[0]?.id;
    sections.forEach((sec) => {
      if (y + 120 >= sec.offsetTop) current = sec.id;
    });
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${current}`));
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ---------- reveal ---------- */
function initReveal() {
  const els = $$(".reveal, .skill-card");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
  );
  els.forEach((el) => io.observe(el));
}

/* ---------- skills filter ---------- */
function initFilters() {
  const buttons = $$(".filter-btn");
  const cards = $$(".skill-card");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const show = f === "all" || card.dataset.cat === f;
        card.style.display = show ? "" : "none";
      });
    });
  });
}

/* ---------- clock + metrics + term ---------- */
function initPanel() {
  const clock = $("#clock");
  const fmt = () => {
    const d = new Date();
    clock.textContent = d.toLocaleTimeString("pt-BR", { hour12: false });
  };
  if (clock) {
    fmt();
    setInterval(fmt, 1000);
  }

  const cpuBar = $("#cpuBar");
  const latBar = $("#latBar");
  const cpuVal = $("#cpuVal");
  const latVal = $("#latVal");

  const tickMetrics = () => {
    const cpu = 18 + Math.round(Math.random() * 22);
    const lat = 8 + Math.round(Math.random() * 10);
    if (cpuBar) cpuBar.style.width = `${cpu}%`;
    if (latBar) latBar.style.width = `${Math.min(lat * 4, 90)}%`;
    if (cpuVal) cpuVal.textContent = `${cpu}%`;
    if (latVal) latVal.textContent = `${lat} ms`;
  };
  tickMetrics();
  setInterval(tickMetrics, 2600);

  const lines = [
    "checking interfaces ............... ok",
    "ad.lab.local  ..................... bound",
    "firewall policy  .................. active",
    "automation jobs  .................. 4 running",
  ];
  const box = $("#termLines");
  if (box) {
    let i = 0;
    const write = () => {
      if (i >= lines.length) return;
      const div = document.createElement("div");
      div.textContent = lines[i];
      box.appendChild(div);
      i += 1;
    };
    const id = setInterval(() => {
      write();
      if (i >= lines.length) clearInterval(id);
    }, 420);
  }
}

/* ---------- contact ---------- */
function toast(msg) {
  const el = $("#toast");
  if (!el) return;
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2800);
}

function initForm() {
  const form = $("#contactForm");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nome = data.get("nome");
    const email = data.get("email");
    const assunto = data.get("assunto");
    const mensagem = data.get("mensagem");
    const body = encodeURIComponent(`Nome: ${nome}\nE-mail: ${email}\n\n${mensagem}`);
    const href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(assunto)}&body=${body}`;
    window.location.href = href;
    toast("Abrindo seu cliente de e-mail…");
    form.reset();
  });

  $$(".project-links a.is-off").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      toast("Demo em breve — conecte o repositório no HTML.");
    });
  });
}

/* ---------- particle network ---------- */
function initParticles() {
  const canvas = $("#bg-network");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  let w = 0;
  let h = 0;
  let points = [];
  let raf = 0;

  const resize = () => {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(90, Math.floor((w * h) / 18000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
    }));
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "rgba(34, 211, 238, 0.55)";
    points.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.2, 0, Math.PI * 2);
      ctx.fill();
    });

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.16;
          ctx.strokeStyle = `rgba(45, 212, 191, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    raf = requestAnimationFrame(draw);
  };

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(raf);
    resize();
    draw();
  });
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initNav();
  initReveal();
  initFilters();
  initPanel();
  initForm();
  initParticles();
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
});
