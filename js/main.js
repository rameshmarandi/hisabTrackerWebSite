// Hisab Tracker - Main JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const themeToggle = document.getElementById("themeToggle");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navMenu = document.getElementById("navMenu");
  const header = document.getElementById("header");
  const currentYear = document.getElementById("currentYear");
  const categoryBtns = document.querySelectorAll(".category-btn");
  const featureCards = document.querySelectorAll(".feature-card");
  const statNumbers = document.querySelectorAll(".stat-number");

  // Set current year in footer
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Theme toggle functionality
  if (themeToggle) {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("hisab-theme") || "dark";
    if (savedTheme === "light") {
      document.body.classList.add("light-theme");
      themeToggle.querySelector("i").classList.remove("fa-moon");
      themeToggle.querySelector("i").classList.add("fa-sun");
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
  if (mobileMenuBtn && navMenu) {
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

    // Close mobile menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        !navMenu.contains(event.target) &&
        !mobileMenuBtn.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
      }
    });
  }

  // Header scroll effect
  if (header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    });
  }

  // Feature category filtering
  if (categoryBtns.length > 0 && featureCards.length > 0) {
    categoryBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        categoryBtns.forEach((b) => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const category = btn.getAttribute("data-category");

        // Show/hide feature cards based on category
        featureCards.forEach((card) => {
          if (
            category === "all" ||
            card.getAttribute("data-category") === category
          ) {
            card.style.display = "block";
            // Trigger reflow for animation
            void card.offsetWidth;
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // Animated counters
  function animateCounters() {
    statNumbers.forEach((stat) => {
      const target = parseFloat(stat.getAttribute("data-count"));
      const suffix = stat.textContent.includes(".") ? 1 : 0;
      const increment = target / 100;
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          stat.textContent = suffix ? current.toFixed(1) : Math.ceil(current);
          setTimeout(updateCounter, 20);
        } else {
          stat.textContent = suffix ? target.toFixed(1) : target;
        }
      };

      updateCounter();
    });
  }

  // Trigger counter animation when stats section is in view
  if (statNumbers.length > 0) {
    const observerOptions = {
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const statsSection = document.getElementById("stats");
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });

        // Close mobile menu if open
        if (navMenu && navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          mobileMenuBtn.querySelector("i").classList.remove("fa-times");
          mobileMenuBtn.querySelector("i").classList.add("fa-bars");
        }
      }
    });
  });

  // Add floating elements dynamically
  const floatingElementsContainer =
    document.querySelector(".floating-elements");
  if (floatingElementsContainer) {
    for (let i = 0; i < 5; i++) {
      const element = document.createElement("div");
      element.className = "floating-element";
      element.style.width = `${100 + Math.random() * 300}px`;
      element.style.height = element.style.width;
      element.style.left = `${Math.random() * 100}%`;
      element.style.top = `${Math.random() * 100}%`;
      element.style.background = i % 2 === 0 ? "#00ff88" : "#00d4ff";
      element.style.animationDelay = `${Math.random() * 15}s`;
      floatingElementsContainer.appendChild(element);
    }
  }

  // Initialize AOS if available
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
    });
  }

  // Initialize Particles.js if available
  if (
    typeof particlesJS !== "undefined" &&
    document.getElementById("particles-js")
  ) {
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

  // Add active class to current page in navigation
  function setActiveNavLink() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const linkHref = link.getAttribute("href");
      if (
        linkHref === currentPage ||
        (currentPage === "index.html" && linkHref === "#home")
      ) {
        link.classList.add("active");
      }
    });
  }

  setActiveNavLink();
});
