// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  disable: window.innerWidth < 768
})

// Initialize Particles.js
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#00ff88' },
    shape: { type: 'circle' },
    opacity: { value: 0.3, random: true },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#00ff88',
      opacity: 0.2,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      bounce: false
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: { enable: true, mode: 'repulse' },
      onclick: { enable: true, mode: 'push' }
    }
  },
  retina_detect: true
})

// DOM Elements
const themeToggle = document.getElementById('themeToggle')
const mobileMenuBtn = document.getElementById('mobileMenuBtn')
const navMenu = document.getElementById('navMenu')
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay')
const header = document.getElementById('header')
const currentYear = document.getElementById('currentYear')
const categoryBtns = document.querySelectorAll('.category-btn')
const featureCards = document.querySelectorAll('.feature-card')
const statNumbers = document.querySelectorAll('.stat-number')

// Set current year
currentYear.textContent = new Date().getFullYear()

// Theme toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-theme')
  const icon = themeToggle.querySelector('i')
  if (document.body.classList.contains('light-theme')) {
    icon.classList.remove('fa-moon')
    icon.classList.add('fa-sun')
    localStorage.setItem('hisab-theme', 'light')
  } else {
    icon.classList.remove('fa-sun')
    icon.classList.add('fa-moon')
    localStorage.setItem('hisab-theme', 'dark')
  }
})

// Check for saved theme
const savedTheme = localStorage.getItem('hisab-theme')
if (savedTheme === 'light') {
  document.body.classList.add('light-theme')
  const icon = themeToggle.querySelector('i')
  icon.classList.remove('fa-moon')
  icon.classList.add('fa-sun')
}

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  navMenu.classList.toggle('active')
  mobileMenuOverlay.classList.toggle('active')
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : ''
  
  const icon = mobileMenuBtn.querySelector('i')
  if (navMenu.classList.contains('active')) {
    icon.classList.remove('fa-bars')
    icon.classList.add('fa-times')
  } else {
    icon.classList.remove('fa-times')
    icon.classList.add('fa-bars')
  }
})

// Close mobile menu when clicking overlay
mobileMenuOverlay.addEventListener('click', () => {
  navMenu.classList.remove('active')
  mobileMenuOverlay.classList.remove('active')
  document.body.style.overflow = ''
  
  const icon = mobileMenuBtn.querySelector('i')
  icon.classList.remove('fa-times')
  icon.classList.add('fa-bars')
})

// Close mobile menu when clicking nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active')
    mobileMenuOverlay.classList.remove('active')
    document.body.style.overflow = ''
    
    const icon = mobileMenuBtn.querySelector('i')
    icon.classList.remove('fa-times')
    icon.classList.add('fa-bars')
  })
})

// Header scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled')
  } else {
    header.classList.remove('scrolled')
  }
})

// Feature category filtering
categoryBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    categoryBtns.forEach(b => b.classList.remove('active'))
    // Add active class to clicked button
    btn.classList.add('active')

    const category = btn.getAttribute('data-category')

    // Show/hide feature cards based on category
    featureCards.forEach(card => {
      if (
        category === 'all' ||
        card.getAttribute('data-category') === category
      ) {
        card.style.display = 'block'
        // Trigger animation
        card.style.opacity = '0'
        card.style.transform = 'translateY(20px)'
        setTimeout(() => {
          card.style.opacity = '1'
          card.style.transform = 'translateY(0)'
        }, 100)
      } else {
        card.style.display = 'none'
      }
    })
  })
})

// Animated counters
function animateCounters() {
  statNumbers.forEach(stat => {
    const target = parseFloat(stat.getAttribute('data-count'))
    const suffix = stat.textContent.includes('.') ? 1 : 0
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        stat.textContent = suffix
          ? current.toFixed(1)
          : Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        stat.textContent = suffix ? target.toFixed(1) : target
      }
    }

    updateCounter()
  })
}

// Trigger counter animation when stats section is in view
const observerOptions = {
  threshold: 0.5
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters()
      observer.unobserve(entry.target)
    }
  })
}, observerOptions)

observer.observe(document.getElementById('stats'))

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const targetId = this.getAttribute('href')
    if (targetId === '#') return

    const targetElement = document.querySelector(targetId)
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      })

      // Close mobile menu if open
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active')
        mobileMenuOverlay.classList.remove('active')
        document.body.style.overflow = ''
        mobileMenuBtn.querySelector('i').classList.remove('fa-times')
        mobileMenuBtn.querySelector('i').classList.add('fa-bars')
      }
    }
  })
})

// Add floating elements dynamically
const floatingElementsContainer = document.querySelector('.floating-elements')
for (let i = 0; i < 5; i++) {
  const element = document.createElement('div')
  element.className = 'floating-element'
  element.style.width = `${100 + Math.random() * 300}px`
  element.style.height = element.style.width
  element.style.left = `${Math.random() * 100}%`
  element.style.top = `${Math.random() * 100}%`
  element.style.background = i % 2 === 0 ? 'var(--primary-dark)' : 'var(--secondary-dark)'
  element.style.animationDelay = `${Math.random() * 15}s`
  floatingElementsContainer.appendChild(element)
}

// Disable AOS on mobile for better performance
window.addEventListener('resize', () => {
  AOS.refresh()
  if (window.innerWidth < 768) {
    document.body.setAttribute('data-aos', 'none')
  } else {
    document.body.removeAttribute('data-aos')
  }
})


// NEW


// Active menu on scroll
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Active menu on click
navLinks.forEach(link => {
  link.addEventListener("click", function () {
    navLinks.forEach(l => l.classList.remove("active"));
    this.classList.add("active");
  });
});
