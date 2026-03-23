// ===== WAIT FOR DOM =====
document.addEventListener("DOMContentLoaded", () => {

  // ===== LOADER =====
  const loader = document.getElementById("loader");
  if (loader) loader.style.display = "none";

  // ===== TYPING =====
  const typingText = "Building Scalable Software & ML Systems";
  let i = 0;
  const el = document.getElementById("typing");

  function type() {
    if (el && i < typingText.length) {
      el.innerHTML += typingText.charAt(i);
      i++;
      setTimeout(type, 35);
    }
  }
  type();

  // ===== SCROLL REVEAL (FIXED) =====
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));

  // 🔥 IMPORTANT FIX → show first section manually
  if (sections.length > 0) {
    sections[0].classList.add("show");
  }

  // ===== CURSOR GLOW =====
  const cursor = document.createElement("div");
  cursor.classList.add("cursor-glow");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // ===== THEME TOGGLE =====
  const toggleBtn = document.getElementById("theme-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
    });
  }

});

// ===== MODAL =====
function openModal(title, desc) {
  const modal = document.getElementById("modal");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");

  if (!modal) return;

  modal.classList.add("active");
  titleEl.innerText = title;
  descEl.innerText = desc;
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
}