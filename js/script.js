// ===================================
// Travel Recommendation Website
// Interactive JavaScript Functionality
// ===================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all features
    initNavigation();
    initScrollAnimations();
    initContactForm();
    initSmoothScroll();
});

// ===================================
// Navigation Functionality
// ===================================
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            navMenu.classList.toggle('active');

            // Animate hamburger menu
            const spans = menuToggle.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translateY(8px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    span.style.transform = '';
                    span.style.opacity = '';
                }
            });
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = menuToggle.querySelectorAll('span');
                spans.forEach(span => {
                    span.style.transform = '';
                    span.style.opacity = '';
                });
            }
        });
    });

    // Highlight active page in navigation
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===================================
// Smooth Scroll Functionality
// ===================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all recommendation cards
    const cards = document.querySelectorAll('.recommendation-card, .about-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect to recommendation cards
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    recommendationCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===================================
// Contact Form Validation & Submission
// ===================================
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (!contactForm) return; // Exit if not on contact page

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Real-time validation
    nameInput.addEventListener('blur', () => validateName());
    emailInput.addEventListener('blur', () => validateEmail());
    subjectInput.addEventListener('blur', () => validateSubject());
    messageInput.addEventListener('blur', () => validateMessage());

    // Remove error on input
    nameInput.addEventListener('input', () => removeError(nameInput));
    emailInput.addEventListener('input', () => removeError(emailInput));
    subjectInput.addEventListener('input', () => removeError(subjectInput));
    messageInput.addEventListener('input', () => removeError(messageInput));

    // Form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();

        // If all fields are valid, submit form
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            submitForm();
        }
    });

    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        if (name === '') {
            showError(nameInput, 'nameError', 'Please enter your name');
            return false;
        } else if (name.length < 2) {
            showError(nameInput, 'nameError', 'Name must be at least 2 characters');
            return false;
        } else {
            removeError(nameInput);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email === '') {
            showError(emailInput, 'emailError', 'Please enter your email address');
            return false;
        } else if (!emailRegex.test(email)) {
            showError(emailInput, 'emailError', 'Please enter a valid email address');
            return false;
        } else {
            removeError(emailInput);
            return true;
        }
    }

    function validateSubject() {
        const subject = subjectInput.value.trim();
        if (subject === '') {
            showError(subjectInput, 'subjectError', 'Please enter a subject');
            return false;
        } else if (subject.length < 3) {
            showError(subjectInput, 'subjectError', 'Subject must be at least 3 characters');
            return false;
        } else {
            removeError(subjectInput);
            return true;
        }
    }

    function validateMessage() {
        const message = messageInput.value.trim();
        if (message === '') {
            showError(messageInput, 'messageError', 'Please enter your message');
            return false;
        } else if (message.length < 10) {
            showError(messageInput, 'messageError', 'Message must be at least 10 characters');
            return false;
        } else {
            removeError(messageInput);
            return true;
        }
    }

    function showError(input, errorId, message) {
        input.classList.add('error');
        const errorElement = document.getElementById(errorId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function removeError(input) {
        input.classList.remove('error');
        const errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('form-error')) {
            errorElement.style.display = 'none';
        }
    }

    function submitForm() {
        // Show success message
        successMessage.classList.add('show');

        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Reset form
        contactForm.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);

        // In a real application, you would send the form data to a server here
        console.log('Form submitted successfully!');
        console.log({
            name: nameInput.value,
            email: emailInput.value,
            subject: subjectInput.value,
            message: messageInput.value
        });
    }
}

// ===================================
// Additional Interactive Features
// ===================================

// Add parallax effect to hero section
window.addEventListener('scroll', function () {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add click animation to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add CSS animation for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c🌍 Welcome to TravelExplore! ', 'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cDiscover your perfect destination with us!', 'color: #667eea; font-size: 14px;');
