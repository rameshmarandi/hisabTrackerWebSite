// DOM Elements
const themeToggle = document.getElementById("themeToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");
const header = document.getElementById("header");
const currentYear = document.getElementById("currentYear");

// Initialize AOS
if (typeof AOS !== "undefined") {
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });
}

// Initialize Particles.js if available
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00ff88" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ff88",
        opacity: 0.2,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
      },
    },
    retina_detect: true,
  });
}

// Set current year
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Theme toggle
if (themeToggle) {
  // Check for saved theme preference or default to dark
  const savedTheme = localStorage.getItem("hisab-theme") || "dark";
  if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    const icon = themeToggle.querySelector("i");
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const icon = themeToggle.querySelector("i");

    if (document.body.classList.contains("light-theme")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
      localStorage.setItem("hisab-theme", "light");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
      localStorage.setItem("hisab-theme", "dark");
    }
  });
}

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}

// Header scroll effect
window.addEventListener("scroll", () => {
  if (header && window.scrollY > 50) {
    header.classList.add("scrolled");
  } else if (header) {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });

      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = mobileMenuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    }
  });
});

// Add floating elements dynamically
function addFloatingElements() {
  const floatingElementsContainer =
    document.querySelector(".floating-elements");
  if (!floatingElementsContainer) return;

  for (let i = 0; i < 5; i++) {
    const element = document.createElement("div");
    element.className = "floating-element";
    element.style.width = `${100 + Math.random() * 300}px`;
    element.style.height = element.style.width;
    element.style.left = `${Math.random() * 100}%`;
    element.style.top = `${Math.random() * 100}%`;
    element.style.background =
      i % 2 === 0 ? "var(--primary-dark)" : "var(--secondary-dark)";
    element.style.animationDelay = `${Math.random() * 15}s`;
    floatingElementsContainer.appendChild(element);
  }
}

// Initialize floating elements when DOM is loaded
document.addEventListener("DOMContentLoaded", addFloatingElements);
