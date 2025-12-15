// Need of Thee - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavigation();
    initScrollEffects();
    initCounterAnimation();
    initDonationButtons();
    initContactForm();
});

// Navigation Toggle for Mobile
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navbar = document.querySelector('.navbar');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // Animate hamburger to X
        const spans = this.querySelectorAll('span');
        spans.forEach(span => span.classList.toggle('active'));
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll Effects & Animations
function initScrollEffects() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add animation class to elements
    document.querySelectorAll('.card, .stat-item, .donation-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Counter Animation for Stats
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;

    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const increment = target / speed;
        let current = 0;

        const updateCount = () => {
            if (current < target) {
                current += increment;
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target.toLocaleString() + '+';
            }
        };

        updateCount();
    };

    // Trigger counter animation when stats section is visible
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => animateCounter(counter));
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
}

// Donation Button Functionality
function initDonationButtons() {
    const amountBtns = document.querySelectorAll('.amount-btn');
    const customInput = document.getElementById('custom-donation');
    const donateBtn = document.querySelector('.donate-btn');
    let selectedAmount = 0;

    // Amount button selection
    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            amountBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Set selected amount
            selectedAmount = parseInt(this.getAttribute('data-amount'));
            // Clear custom input
            if (customInput) {
                customInput.value = '';
            }
        });
    });

    // Custom amount input
    if (customInput) {
        customInput.addEventListener('input', function() {
            amountBtns.forEach(b => b.classList.remove('active'));
            selectedAmount = parseInt(this.value) || 0;
        });
    }

    // Donate button click
    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            if (selectedAmount > 0) {
                showToast(`Thank you for your generous donation of $${selectedAmount}! (Demo only)`, 'success');
            } else {
                showToast('Please select or enter a donation amount.', 'error');
            }
        });
    }
}

// Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // Basic validation
            if (!name || !email || !message) {
                showToast('Please fill in all fields.', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showToast('Please enter a valid email address.', 'error');
                return;
            }

            // Simulate form submission (in production, this would send to a server)
            showToast('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        });
    }
}

// Email Validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toast if any
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;

    // Add to document
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Hide and remove toast after 4 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 4000);
}

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Add hover effect sounds (optional - commented out by default)
// Uncomment if you want subtle interaction sounds
/*
function playHoverSound() {
    const audio = new Audio('hover.mp3');
    audio.volume = 0.1;
    audio.play();
}
*/
